var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'mysecret';

module.exports = function (app) {
    var Users = app.models.users;
    var controller = {};

    controller.list = function (req, res) {
        Users.find().exec()
        .then(
            function(users) {
                console.log(users);
                res.json(users);
            },
            function(erro) {
                res.status(500).json(erro);
            }
        );
    };

    controller.get = function (req, res) {
        Users.findById(req.params.id).exec()
            .then(
                function (user) {
                    if (!user) throw new Error("User not found!");
                    res.json(user);
                },
                function (erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };

    controller.getByEmail = function (req, res) {
        try {
            Users.findOne({
                email: req.params.email
            }, function (err, user) {
                if (err) {
                    return res.json(err);
                }
                res.json(user);
            });
        } catch (error) {
            console.log(error);
        }
    };

    controller.remove = function (req, res) {
        Users.remove({
                "_id": req.params.id
            }).exec()
            .then(
                function () {
                    res.end();
                },
                function (erro) {
                    return console.error(erro);
                }
            );
    };

    controller.login = function (req, res) {
        console.log(req.body);
        var username = req.body.username || '';
        var password = req.body.password || '';
        if (username === '' || password === '') {
            return res.send(401);
        }

        Users.findOne({
            username: username,
            password: password
        }, function (err, user) {
            if (err) {
                return res.json(401, err);
            }
            if (!user) {
                return res.json(401, {
                    message: 'User or password invalid'
                });
            }

            user.authentication(password, function (isMatch) {
                if (!isMatch) {
                    return res.send(401);
                }
                var expires = moment().add(7, 'days').valueOf();
                var token = jwt.encode({
                    iss: user.id,
                    exp: expires
                }, secret);
                //4
                return res.json({
                    token: token,
                    expires: expires,
                    user: user.toJSON()
                });
            });
        });
    };

    controller.validateJWTForAdmin = function(req, res, next) {
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
                Users.findOne({
                    _id: decoded.iss
                }, function(err, user) {
                    if (err){
                        res.status(500).json({
                            message: "error search token."
                        });
                    }else if(user.permition!='ciadministration'){
                        res.status(401).json({
                            message: 'Erro: Invalid Token'
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

    controller.validateSucess = function (req, res) {
        res.json({
            message: "Login Sucess"
        });
    };

    controller.save = function (req, res) {

        var data = new Users(req.body);

        console.log(data.permition);

        if (data.permition === undefined || data.permition === null) {
            data.permition = 'client';
        }
        console.log(req.body);

        data.save(function (error) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log('Salvo com Sucesso');
                res.json({
                    message: 'Salvo com Sucesso',
                    data: data
                });
            }
        });
    };

    return controller;
};
