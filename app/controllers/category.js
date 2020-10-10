var sanitize = require('mongo-sanitize');

module.exports = function(app){
    var Category = app.models.category,
        controller = {};

    controller.save = function(req, res){
        var id = sanitize(req.body.id);
        var category = {
            name: req.body.name
        };

        if(id){
            Category.findByIdAndUpdate(id, category).exec()
            .then(
                function(){
                    res.json(req.body);
                },
                function(error){
                    res.status(500).json(error);
                }
            );
        } else {
            Category.create(category)
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

    controller.list = function(req, res){
        Category.find().exec()
        .then(
            function(categories){
                if(!categories) throw new Error('Category not found');
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
            Category.remove({_id: id}).exec()
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
