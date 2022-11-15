const express = require('express');
const session = require('express-session');
const path = require('path');
const config = require('./config.js');
const app = express()

app.use('/assets', express.static(path.join(__dirname , '/assets')));
app.use('/views', express.static(path.join(__dirname , '/views')));
app.use(express.urlencoded({ extended: true }));

app.use('/chart.js',express.static(path.join(__dirname,'./node_modules/chart.js/dist/chart.js')))
app.use('/fullcalendar.js',express.static(path.join(__dirname,'./node_modules/fullcalendar/main.min.js')))
app.use('/fullcalendar.css',express.static(path.join(__dirname,'./node_modules/fullcalendar/main.css')))

const appController = require('./controllers/appController.js');
const userController = require('./controllers/userController.js');
const moneyController = require('./controllers/moneyController.js');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use('/', appController);
app.use('/users', userController);
app.use('/money', moneyController);

//lopott message helper
app.locals.message = '';
app.locals.messagetype = 'danger';
app.locals.isMessage = false;

app.listen(config.appconfig.port, () => {
    console.log(`Server listening on port ${config.appconfig.port}...`);
});