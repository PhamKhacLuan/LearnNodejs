const newsRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const loginRouter   = require('./login');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/login', loginRouter);

    app.use('/', siteRouter);
}

module.exports = route;
