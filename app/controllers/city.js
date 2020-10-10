var sanitize = require('mongo-sanitize');

module.exports = function(app){
    var City = app.models.city,
        controller = {};

    controller.save = function(req, res){
        var id = sanitize(req.body.id);
        var city = {
            name: req.body.name,
            state: req.body.state
        };

        if(id){
            City.findByIdAndUpdate(id, city).exec()
            .then(
                function(){
                    res.json(req.body);
                },
                function(error){
                    res.status(500).json(error);
                }
            );
        } else {
            City.create(city)
            .then(
                function(data){
                    res.json(data);
                },
                function(error){
                    res.status(500).json(error);
                }
            );
        }
    };

    controller.getState = function(req, res) {

        var id = req.params.id.replace(/^\s+/,"");
        var ObjectID = require('mongodb').ObjectID;
        var state = ObjectID.createFromHexString(id);

        City.find({ 'state': state
            }).exec()
            .then(
                function (city) {
                    if (!city) throw new Error("Contato não encontrado");
                    res.json(city);
                },
                function (erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };

    controller.list = function(req, res){
        City.find().exec()
        .then(
            function(categories){
                if(!categories) throw new Error('city not found');
                res.json(categories);
            },
            function(error){
                res.status(500).json(error);
            }
        );
    };

    controller.remove = function(req, res){
        var id = sanitize(req.params.id);

        if(id){
            City.remove({_id: id}).exec()
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

    return controller;
};
