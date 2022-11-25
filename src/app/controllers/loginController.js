// const Course = require('../models/Course');
// const {mutipleMongooseToObject} = require('../../util/mongoose')
const { render } = require("node-sass");
const ClientUser = require("../models/ClientUser");
const CourseController = require("./CourseController");
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const loginMethod = require('../method/LoginMethod');
const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const { restore } = require("./CourseController");

// const lowdb = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');

const TABLENAME = 'user';

class LoginController {

    // [GET] /login/sign-in
    signIn(req, res, next) {
        res.render('login/login-courses')
    }

    // [GET] /login/sign-up
    signUp(req, res, next) {
        res.render('login/sign-up-courses')
    }

    // [POST] /login/register
    // register(req, res,next){
    //     const clientUser = new ClientUser(req.body);
    //     clientUser.save()
    //         .then(() => res.render('login/login-courses'))
    //         .catch(error=>{console.log(error);})
    // }

    createUser(user) {
        try {
            clientUser.save()
                .then(() => res.render('login/login-courses'))
                .catch(error => res.status(400).send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại'));
        } catch {
        }
    }

    register = async (req, res) => {
        const username = req.body.username.toLowerCase();
        ClientUser.findOne({ username: username })
            .then(user => {
                if (user) res.status(409).send('Tên tài khoản đã tồn tại.');
                else {
                    const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
                    req.body.password = hashPassword;
                    const newUser = new ClientUser(req.body);
                    newUser.save()
                        .then(() => res.render('login/login-courses'))
                        .catch(error => res.status(400).send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại'));
                }
            });
    };

    // [POST] /login/checked
    checked(req, res, next) {
        const username = req.body.username.toLowerCase();
        const password = req.body.password;
        ClientUser.findOne({ username: username })
            .then(user => {
                if (!user) {
                    res.status(401).send('Tên đăng nhập không tồn tại.');
                }else{
                    const isPasswordValid = bcrypt.compareSync(password, user.password);
                    if (!isPasswordValid) {
                        res.status(401).send('Mật khẩu không chính xác.');
                    }else{
                        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
                        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
                        const dataForAccessToken = {
                            username: user.username,
                        };
                        const accessToken = loginMethod.generateToken(
                            dataForAccessToken,
                            accessTokenSecret,
                            accessTokenLife,
                        );
                        if (!accessToken) {
                            res.status(401).send('Đăng nhập không thành công, vui lòng thử lại.');
                        }else{
                            let refreshToken = randToken.generate(jwt.refreshTokenSize);
                            if (!user.refreshToken) {
                                // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
                                loginMethod.updateRefreshToken(user.username, refreshToken);
                            } else {
                                // Nếu user này đã có refresh token thì lấy refresh token đó từ database
                                refreshToken = user.refreshToken;
                            }
                            req.session.user =
                            {
                                name : user.name,
                                username : user.username,
                                phone : user.phone,
                                address : user.address
                            }
                            res.redirect(`/`);
                        }
                    }
                }
            })
            .catch();

    }
}

module.exports = new LoginController();
