// const Course = require('../models/Course');
// const {mutipleMongooseToObject} = require('../../util/mongoose')

const ClientUser = require("../models/ClientUser");
const CourseController = require("./CourseController");

class LoginController {

    // [GET] /login/sign-in
    signIn(req, res,next){
        res.render('login/login-courses')
    }

    // [GET] /login/sign-up
    signUp(req, res,next){
        res.render('login/sign-up-courses')
    }

    // [POST] /login/create
    create(req, res,next){
        const clientUser = new ClientUser(req.body);
        clientUser.save()
            .then(() => res.render('login/login-courses'))
            .catch(error=>{console.log(error);})
    }

}

module.exports = new LoginController();
