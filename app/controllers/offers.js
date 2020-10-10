var formidable = require('formidable'),
    util = require('util'),
    fs = require('fs-extra'),
    sanitize = require('mongo-sanitize');

module.exports = function(app) {
    var Offer = app.models.offers;
    var controller = {};

    controller.get = function(req, res) {
        Offer.findById(req.params.id, {
                password: 0
            }).populate('company').exec()
            .then(
                function(offer) {
                    if (!offer) throw new Error("Contato não encontrado");
                    console.log("Empresa obtido com sucesso");
                    res.json(offer);
                },
                function(erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };

    controller.getForUserId = function(req, res){

        var id = req.params.id.replace(/^\s+/,"");
        if(id.length!=24){
            var cont = 24 - id.length;
            for (var i = 0; i < cont; i++) {
                id = id + i;
            }
        }
        var ObjectID = require('mongodb').ObjectID;
        var userId = ObjectID.createFromHexString(id);

        Offer.find({generationsCoupons: {$elemMatch: {user_Id: userId}}}).populate('company').exec()
            .then(
                function (contato) {
                    if (!contato) throw new Error("Contato não encontrado");
                    res.json(contato);
                },
                function (erro) {
                    res.status(404).json(erro);
                }
            );
    };

    controller.getForCompanyId = function(req, res) {

        var id = req.params.id.replace(/^\s+/,"");
        var ObjectID = require('mongodb').ObjectID;
        var companyId = ObjectID.createFromHexString(id);

        Offer.find({ 'company': companyId
            }).populate('company').exec()
            .then(
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

    controller.filter = function(req, res){

        var category = req.params.category;
        var city = req.params.city;
        var state = req.params.state;

        Offer.find({company:{ name: 'Ferrari'}}).populate([{path:'category'}, {path:'company'}, {path:'state'}]).exec()
            .then(
                function (offer) {
                    console.log(offer);
                    if (!offer) throw new Error("Contato não encontrado");
                    res.json(offer);
                },
                function (erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };

    controller.remove = function(req, res) {
        Offer.remove({
                "_id": req.params.id
            }).exec()
            .then(
                function() {
                    res.end("Deletado com sucesso");
                },
                function(erro) {
                    res.end("Erro ao Deletar");
                }
            );
    };

    controller.list = function(req, res) {
        Offer.find().populate('company').exec()
            .then(
                function(offer) {
                    res.json(offer);
                },
                function(erro) {
                    res.status(500).json(erro);
                }
            );
    };

    controller.save = function (req, res) {
        var sendOffer = [];

        if(req.body.saveCouponUser){
            saveInMongo(req.body, res);
        }
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
            sendOffer = fields;
        });

        form.on('end', function (fields, files) {

            if (this.openedFiles[0] === undefined || this.openedFiles[0] === null) {
                saveInMongo(sendOffer, res);
            } else {
                sendOffer.image = this.openedFiles[0].name;
                fs.copy(this.openedFiles[0].path, 'public/src/images/'+sendOffer.nameCompany+'/offers/' + this.openedFiles[0].name, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        saveInMongo(sendOffer, res);
                    }
                });
            }
        });
    };

    function saveInMongo(sendOffer, res) {
        if (sendOffer._id) {
            //var id = sendOffer.generationsCoupons.user_Id.replace(/^\s+/,"");
            var id = sendOffer.generationsCoupons.user_Id;

            /*if(id.length!=24){
                var cont = 24 - id.length;
                for (var i = 0; i < cont; i++) {
                    id = id + i;
                }
                sendOffer.generationsCoupons.user_Id = id;
            }*/
            Offer.findById(sendOffer._id).then(
                function(resul) {
                    resul.generationsCoupons = resul.generationsCoupons.concat(sendOffer.generationsCoupons);

                    Offer.findByIdAndUpdate(sendOffer._id, resul).exec()
                        .then(
                            function(result) {
                                res.json(result);
                            },
                            function(error) {
                                console.log(error);
                                res.status(500).json(error);
                            }
                        );
                },
                function(erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
        } else {

            if(!sendOffer.generationsCoupons){
                sendOffer.generationsCoupons= [];
            }

            Offer.create(sendOffer)
            .then(
                function (offers) {
                    console.log("Salvo com sucesso");
                    res.status(201).json(offers);
                },
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro);
                }
            );
        }
    }

    return controller;
};
