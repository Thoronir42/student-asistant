require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const SignController = require("./controllers/SignController");

const Configurator = require('./di/Configurator');

const config = new Configurator();

const controllers = require('./controllers');

config.addDefinitions(controllers.list);
const container = config.getContainer();


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, '..', 'sass'),
    dest: path.join(__dirname, '..', 'public/stylesheets'),
    prefix: '/stylesheets',
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
}));

app.use(express.static(path.join(__dirname, '..', 'public')));

// Routing
const ModularRouter = require('./routes/ModularRouter');

const TemplateRouterModule = require('./routes/TemplateRouterModule');
const SignRouterModule = require('./routes/SignRouterModule');
const WatsonRouterModule = require('./routes/WatsonRouterModule');

app.use((req, res, next) => {
    req.appVars = {
        isSignedIn: !!req.cookies[SignController.COOKIE],
    };

    next();
});



const router = new ModularRouter(container);
router.addModule(TemplateRouterModule);
router.addModule(SignRouterModule, {
    urlPrefix: '/sign'
});
router.addModule(WatsonRouterModule);

app.use('/', router.compileRouter());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
