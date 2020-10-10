module.exports = function(app) {

    var controllerCompany = app.controllers.company,
    controllerUser = app.controllers.users,
    controllerCategory = app.controllers.category,
    controllerOffer = app.controllers.offers,
    controllerCity = app.controllers.city,
    controllerState = app.controllers.state,
    controllerMessage = app.controllers.message;

    /********** Company Controller ***********/


    app.route('/company/message')
    .get(controllerCompany.listMessage)
    .post(controllerCompany.saveMessage);

    app.route('/company/')
    .get(controllerCompany.list)
    .post(controllerCompany.save);

    app.route('/company/:id')
    .get(controllerCompany.get)
    .delete(controllerCompany.remove);

    app.route('/company/login/')
    .post(controllerCompany.login);

    app.route('/company/search/:q')
    .get(controllerCompany.searchCompany);

    app.route('/company/skip/:skip/limit/:limit')
    .get(controllerCompany.companyListByPage);

    app.route('/company')
    .get(controllerCompany.list)
    .post(controllerCompany.save);

    app.route('/company/:id')
    .get(controllerCompany.get)
    .post(controllerCompany.save);

    app.route('/company/:token/id/:id')
    .post(controllerCompany.validateCompany, controllerCompany.save)
    .get(controllerCompany.validateCompany, controllerCompany.get)
    .delete(controllerCompany.validateCompany, controllerCompany.remove);

    /********** Category Controller ***********/

    app.route('/category/:id')
    .delete(controllerCategory.remove);

    app.route('/category')
    .get(controllerCategory.list)
    .post(controllerCategory.save)
    .put(controllerCategory.save);

    /********** City Controller ***********/

    app.route('/city/:id')
    .get(controllerCity.getState)
    .delete(controllerCity.remove);

    app.route('/city')
    .get(controllerCity.list)
    .post(controllerCity.save)
    .put(controllerCity.save);

    /********** State Controller ***********/

    app.route('/state/:id')
    .delete(controllerState.remove);

    app.route('/state')
    .get(controllerState.list)
    .post(controllerState.save)
    .put(controllerState.save);

    app.route('/create/state/city')
    .post(controllerState.saveStateCity);

    /********** Offer Controller ***********/

    app.route('/offer')
    .get(controllerOffer.list) //should create validation for create offer
    .post(controllerOffer.save)
    .put(controllerOffer.save);

    app.route('/offers/category/:category/state/:state/city/:city')
    .get(controllerOffer.filter);

    app.route('/offer/:id')
    .get(controllerOffer.get)
    .post(controllerOffer.save)
    .delete(controllerOffer.remove);

    app.route('/offer/company/:id')
    .get(controllerOffer.getForCompanyId);

    app.route('/offer/user/:id')
    .get(controllerOffer.getForUserId);

    /********** User Controller ***********/

    app.route('/user')
    .post(controllerUser.save)
    .get(controllerUser.list);
    //.get(controllerUser.validateJWT, controllerUser.list);

    app.route('/user/:id')
    .get(controllerUser.get)
    .delete(controllerUser.remove);

    app.route('/user/email/:email')
    .get(controllerUser.getByEmail);

    app.route('/login')
    .post(controllerUser.login);

    app.route('/message')
    .post(controllerMessage.save);

    //********** Administration Controller *************//
    //-------------- Company -------------------//
    app.route('/admin/company/:token/id/:id')
    .get(controllerUser.validateJWTForAdmin,controllerCompany.get)
    .delete(controllerUser.validateJWTForAdmin, controllerCompany.removeMessages);

    app.route('/admin/company/:token')
    .get(controllerUser.validateJWTForAdmin,controllerCompany.list);

    app.route('/admin/company/message/:token')
    .get(controllerUser.validateJWTForAdmin, controllerCompany.listMessage);

    //-------------- Company -------------------//

    app.route('/admin/user/:token/id/:id')
    .get(controllerUser.validateJWTForAdmin,controllerUser.get)
    .delete(controllerUser.validateJWTForAdmin, controllerUser.remove);

    app.route('/admin/user/:token')
    .get(controllerUser.validateJWTForAdmin,controllerUser.list);

    app.route('/admin/user/message/:token')
    .get(controllerUser.validateJWTForAdmin, controllerMessage.list);


    app.all('/*', function(req, res, next) {
        // Just send the index.html for other files to support HTML5Mode
        res.sendFile('index.html', {
            root: __dirname + '../../../public/'
        });
    });
};
