var { engine } = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override')
const express = require('express');
const session = require('express-session');
const store = new session.MemoryStore();
const app = express();
const port = 3000;
const path = require('path');

const sortMiddleware = require('./app/middlewares/SortMiddleware');
const loginMiddleware = require('./app/middlewares/LoginMiddleware');

const route = require('./routes');
const db = require('./config/db');

//connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));
//sesssion
app.use(session({
    store,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
//custom middlewares
app.use(sortMiddleware);
app.use(loginMiddleware);
//HTTP logger
app.use(morgan('combined'));
//Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a,b) => a + b,
            sortable:(field, sort)=> {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType];
                const type = types[sortType];

                return '<a href="?_sort&column='+field+'&type='+type+'">'+
                '<span class="'+icon+'"></span></a>';
            },
            loginable:(isLoginForm) =>{
                if(isLoginForm.enabled == true)
                {
                    return '<ul class="navbar-nav ml-auto mt-2 mt-lg-0">'
                    +'<li class="nav-item dropdown">'
                    +  '<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"'
                    +    'aria-haspopup="true" aria-expanded="false">'
                    +   isLoginForm.name
                    +  '</a>'
                    +  '<div class="dropdown-menu" aria-labelledby="navbarDropdown">'
                    +    '<a class="dropdown-item" href="/courses/create">Đăng khóa học</a>'
                    +    '<div class="dropdown-divider"></div>'
                    +    '<a class="dropdown-item" href="/me/stored/courses">Khóa học của tôi</a>'
                    +    '<a class="dropdown-item" href="/me/stored/news">Bài viết của tôi</a>'
                    +    '<div class="dropdown-divider"></div>'
                    +    '<a class="dropdown-item" href="#">Đăng xuất</a>'
                    +  '</div>'
                    +'</li>'
                    +'</ul>'
                }
                else{
                    return '<a class="nav-item" href="/login/sign-in">Đăng nhập</a>';
                }
            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});