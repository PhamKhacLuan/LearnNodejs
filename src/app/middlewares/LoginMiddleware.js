const ClientUser = require('../models/ClientUser');
module.exports = function LoginMiddleware(req, res, next) {
    res.locals._isLoginForm = {
        enabled: false,
        username: '',
        name: '',
        phone: '',
        address: ''
    };
    if(req.session.user){
        res.locals._isLoginForm.enabled = true;
        res.locals._isLoginForm.name = req.session.user.name;
        res.locals._isLoginForm.username = req.session.user.username;
        res.locals._isLoginForm.phone = req.session.user.phone;
        res.locals._isLoginForm.address = req.session.user.address;
    }
    next();
}