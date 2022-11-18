const ClientUser = require('../models/ClientUser');
module.exports = function LoginMiddleware(req, res, next) {
    res.locals._isLoginForm = {
        enabled: false,
        username: '',
        name: '',
        phone: '',
        address: ''
    };
    if(req.query.hasOwnProperty('_isLoginForm')){
        console.log(req.query.user);
        ClientUser.findOne({username: req.query.user})
           .then(user => {
                res.locals._isLoginForm.enabled = true;
                res.locals._isLoginForm.name = user.name;
                res.locals._isLoginForm.username = user.username;
                res.locals._isLoginForm.phone = user.phone;
                res.locals._isLoginForm.address = user.address;
            })
    }
    next();
}