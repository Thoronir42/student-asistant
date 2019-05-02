require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const UnauthorizedError = require('./errors/UnauthorizedError');

const config = require('./config').getConfigurator({
    stagBaseUrl: process.env.STAG_BASE_URL,
    stagLoginUrl: process.env.STAG_LOGIN_URL,
});

const container = config.getContainer();

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'wow. Such Secrit. Amazing Secure',
}));

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

/** @type {Authenticator} */
const authenticator = container.getService('authenticator');

app.locals = {
    appName: 'AsiStudent',
};

app.use(function requestInformation(req, res, next) {
    res.locals = {
        baseUrl: `${req.protocol}://${req.get('host')}`,
    };

    next();
});

app.use(function identity(req, res, next) {
    res.locals.identity = authenticator.loadIdentity(req.session);

    next();
});


const router = new ModularRouter(container);
router.addModule(TemplateRouterModule);
router.addModule(SignRouterModule, {
    urlPrefix: '/sign'
});
router.addModule(WatsonRouterModule);

app.use('/', router.compileRouter());

app.use((error, req, res, next) => {
    if (error instanceof UnauthorizedError) {
        res.redirect('/');
    }

    next(error);
});

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
