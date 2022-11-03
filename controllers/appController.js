const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const config = require('../config.js');
const moment = require('moment');

router.get('/',(req,res)=>{
    if (!req.app.locals.isMessage) {
        req.app.locals.message = '';
    }
    ejs.renderFile('views/login.ejs',{app:config.appconfig,err: req.app.locals},(err,data)=>{
        if (err) res.status(500).send(err)
        else{
            req.app.locals.isMessage = false;
            res.status(200).send(data)
        }
    })
})

router.get('/reg',(req,res)=>{
    if (!req.app.locals.isMessage) {
        req.app.locals.message = '';
    }
    ejs.renderFile('views/registration.ejs', { app: config.appconfig, err: req.app.locals }, (err, data) => {
        req.app.locals.isMessage = false;
        res.send(data)
    });
})

router.get('/home',(req,res)=>{
    if (req.session.loggedIn) {
        if (!req.app.locals.isMessage) {
            req.app.locals.message = '';
        }

        ejs.renderFile('views/home.ejs', { app: config.appconfig, err: req.app.locals, user: req.session }, (err, data) => {
            req.app.locals.isMessage = false;
            res.send(data)
        });
    } else {
        res.redirect('/');
    }
})

module.exports = router;