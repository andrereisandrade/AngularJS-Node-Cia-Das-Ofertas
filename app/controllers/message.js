var sanitize = require('mongo-sanitize');

module.exports = function(app){
    var Message = app.models.message,
    controller = {};

    controller.save = function(req, res){
        Message.create(req.body)
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

    controller.list = function(req, res){
        console.log(req.body);
        Message.find().exec()
        .then(function(Messages){
                if(!Messages) throw new Error('Message not found');
                res.json(Messages);
            },
            function(error){
                res.status(500).json(error);
            }
        );
    };

    controller.remove = function(req, res){
        var id = sanitize(req.params.id);

        if(id){
            Message.remove({_id: id}).exec()
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
