var formidable = require('formidable'),
util = require('util'),
fs = require('fs-extra'),
sanitize = require('mongo-sanitize'),
jwt = require('jwt-simple'),
moment = require('moment'),
secret = 'mysecret';


module.exports = function (app) {
    var Company = app.models.company;
    var CompanyMessage = app.models.companyMessages;
    var controller = {};

    controller.get = function (req, res) {

        Company.findById(req.params.id, {
            password: 0
        }).populate([{path:'category'}, {path:'state'}]).exec()
        .then(
            function (company) {
                if(!company){
                    res.json("Error find company");
                }
                res.json(company);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
        );
    };

    controller.searchCompany = function (req, res) {
        var b = req.params.q;
        Company.find({ $or: [
            {
                name: new RegExp(b, 'i')
            },
            {
                city: new RegExp(b, 'i')
            }
        ]}).exec().then(
            function (contato) {
                if (!contato) throw new Error("Contato não encontrado");
                res.json(contato);
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro);
            }
        );
    };

    controller.remove = function (req, res) {
        Company.remove({
            "_id": req.params.id
        }).exec()
        .then(
            function () {
                res.end();
            },
            function (erro) {
                res.status(500).json(erro);
            }
        );
    };

    controller.list = function (req, res) {

        Company.find().populate([{path:'category'}, {path:'state'}]).exec()
        .then(
            function (companies) {
                res.json(companies);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };

    controller.companyListByPage = function (req, res) {
        var limit = parseInt(req.params.limit),
        skip = parseInt(req.params.skip);

        Company.find().limit(limit).skip(skip).exec()
        .then(
            function (companies) {
                res.json(companies);
            },
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };

    controller.login = function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        console.log(req.body);

        if (username === '' || password === '') { return res.send(401); }

        Company.findOne({
            username: username
        }, function(err, company) {
            if (err) {
                return res.json(401, err);
            }
            if(!company){
                return  res.json(401, { message: 'company or password invalid' });
            }
            console.log(company);
            company.authentication(password, function(isMatch) {
                if (!isMatch) {
                    return res.send(401);
                }
                var expires = moment().add(7, 'days').valueOf();
                var token = jwt.encode({
                    iss: company.id,
                    exp: expires
                }, secret);
                //4
                return res.json({
                    token: token,
                    expires: expires,
                    company: company.toJSON()
                });
            });
        });
    };

    controller.save = function (req, res) {
        var sendCompany = [];

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.write('Escrevendo imagem:\n\n');
            res.end(util.inspect({
                fields: fields,
                files: files
            }));
            sendCompany = fields;

        });
        form.on('end', function (fields, files) {
            if (this.openedFiles[0] === undefined || this.openedFiles[0] === null) {
                saveInMongo(sendCompany, res);
            } else {
                console.log(sendCompany.name);
                sendCompany.image = this.openedFiles[0].name;
                fs.copy(this.openedFiles[0].path, 'public/src/images/'+sendCompany.name+'/'+ this.openedFiles[0].name, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        saveInMongo(sendCompany, res);
                    }
                });
            }
        });
    };

    // #####  Messages  #####

    controller.saveMessage = function(req, res){
        CompanyMessage.create(req.body)
        .then(
            function(data){
                console.log('sucesso');
                res.json(data);
            },
            function(error){
                console.log(error);
                res.status(500).json(error);
            }
        );
    };

    controller.listMessage = function(req, res){
        CompanyMessage.find().exec()
        .then(
            function(Messages){
                if(!Messages) throw new Error('Message not found');
                console.log(Messages);
                res.json(Messages);
            },
            function(error){
                console.log(Messages);
                res.status(500).json(error);
            }
        );
    };

    controller.removeMessages = function(req, res){
        var id = sanitize(req.params.id);
        if(id){
            CompanyMenssage.remove({_id: id}).exec()
            .then(
                function(){
                    res.status(204).end();
                },
                function(error){
                    res.status(500).json(error);
                }
            );
        }
    };

    controller.validateCompany = function(req, res, next) {
        //TODO: Change for Headers
        //var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        token = req.params.token;
        console.log(token);
        if (token) {
            try {
                var decoded = jwt.decode(token, secret);
                if (decoded.exp <= Date.now()) {
                    res.json(400, {
                        error: 'Acesso Expirado, faça login novamente'
                    });
                }
                Company.findOne({
                    _id: decoded.iss
                }, function(err, user) {
                    if (err){
                        res.status(500).json({
                            message: "error search token."
                        });
                    }
                    req.body = user;
                    return next();
                });

            } catch (err) {
                return res.status(401).json({
                    message: 'Erro: Invalid Token'
                });
            }
        } else {
            console.log('token');
            res.status(401).json({

                message: 'Erro: Invalid Token'
            });
        }
    };


    function saveInMongo(sendCompany, res) {
        if (sendCompany._id) {
            returnCompany = parseCompany(sendCompany);
            console.log(returnCompany);
            Company.findByIdAndUpdate(sendCompany._id, returnCompany).exec()
            .then(
                function (businesses) {
                    res.json(businesses);
                },
                function (erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
        } else {

            var data = new Company(sendCompany);
            data.save(function(error) {
                if (error) {
                    console.log('Erro ao salvar empresa! ',error);
                    //res.send(error);
                } else {
                    console.log('Salvo com Sucesso');
                    //res.json(data);
                }
            });
        }
    }

    function parseCompany(sendCompany) {
        var company = {};
        company.name = sendCompany.name;
        company.description = sendCompany.description;
        company.password = sendCompany.password;
        company.street = sendCompany.street;
        company.number = sendCompany.number;
        company.neighborhood = sendCompany.neighborhood;
        company.city = sendCompany.city;
        company.state = sendCompany.state;
        company.site = sendCompany.site;
        company.email = sendCompany.email;
        company.facebook = sendCompany.facebook;
        company.phoneNumber = sendCompany.phoneNumber;
        company.cellPhone = sendCompany.cellPhone;
        company.category = sendCompany.category;
        company.image = sendCompany.image;
        company.credit = sendCompany.credit;
        return company;
    }

    return controller;
};
