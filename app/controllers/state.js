var sanitize = require('mongo-sanitize');
var Promise = require('promise')

module.exports = function (app) {
    var State = app.models.state,
        City = app.models.city,
        controller = {};

    controller.save = function (req, res) {
        var id = sanitize(req.body.id);
        var state = {
            name: req.body.name,
            acronyms: req.body.acronyms
        };

        if (id) {
            State.findByIdAndUpdate(id, state).exec()
                .then(
                    function () {
                        res.json(req.body);
                    },
                    function (error) {
                        res.status(500).json(error);
                    }
                );
        } else {
            State.create(state)
                .then(
                    function (data) {
                        res.json(data);
                    },
                    function (error) {
                        res.status(500).json(error);
                    }
                );
        }

    };

    controller.saveStateCity = function (req, res) {
        var dataFile = require('../../utils/estados-cidades.json');
        var i = 0,
            j = 0,
            payload;

        var SetVariables = function () {
            this.i = 0;
            return this
        }

        SetVariables.prototype.addI = function (n) {
            this.i += n;
        }

        SetVariables.prototype.getCont = function () {
            return this.i;
        }

        SetVariables.prototype.getDataFile = function () {
            return this.dataFile;
        }
        
        var setVariables = new SetVariables();

        var insertCity = function (dataFile, res, i) {
            for (var j = 0; dataFile.estados[i].cidades.length > j; j++) {
                payload = {
                    "name": dataFile.estados[i].cidades[j],
                    "state": res._id
                }

                City.create(payload);
            }
        }


        for (i = 0; dataFile.estados.length > i; i++) {
            try {
                payload = {
                    "name": dataFile.estados[i].nome,
                    "acronyms": dataFile.estados[i].sigla
                }

                State.create(payload)
                    .then(
                        function (res) {
                            try {
                                insertCity(dataFile, res, setVariables.i);
                                setVariables.addI(1);
                            } catch (error) {
                                console.log(error);
                            }

                        },
                        function (error) {
                            res.status(500).json(error);
                        }
                    );
            } catch (error) {
                res.json(error);
            }

        }
        res.json("Created sucessfully!");

    }


    controller.list = function (req, res) {
        State.find().exec()
            .then(
                function (categories) {
                    if (!categories) throw new Error('state not found');
                    res.json(categories);
                },
                function (error) {
                    res.status(500).json(error);
                }
            );
    };

    controller.remove = function (req, res) {
        var id = sanitize(req.params.id);

        if (id) {
            State.remove({
                    _id: id
                }).exec()
                .then(
                    function () {
                        res.status(204).end();
                    },
                    function (error) {
                        res.status(500).json(error);
                    }
                );
        }
    };

    return controller;
};