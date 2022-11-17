const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose')

class SiteController {
    // [GET] /
    index(req, res, next) {
        //Callback
        // Course.find({},function(err,course){
        //     if(!err) {res.json(course);
        //         return;
        //     }
        //     next(err);
        // });
        // res.render('home');

        //Promise
        Course.find()
            .then((courses) =>{
                res.render('home', {
                    courses : mutipleMongooseToObject(courses)
                });
            }
            )
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
