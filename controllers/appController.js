const express = require('express')
const router = express.Router()
const ejs = require('ejs')
const config = require('../config.js')
const moment = require('moment')
var mysql = require('mysql')
var pool = mysql.createPool(config.dbconfig)

router.get('/',(req,res)=>{
    if (!req.app.locals.isMessage) {
        req.app.locals.message = ''
    }
    ejs.renderFile('views/login.ejs',{app:config.appconfig,err: req.app.locals,user: req.session },(err,data)=>{
        if (err) {
            res.status(500).send(err)
            console.log(err)
        }
        else{
            req.app.locals.isMessage = false;
            res.status(200).send(data)
        }
    })
})

router.get('/reg',(req,res)=>{
    if (!req.app.locals.isMessage) {
        req.app.locals.message = ''
    }
    ejs.renderFile('views/registration.ejs', { app: config.appconfig, err: req.app.locals ,user: req.session}, (err, data) => {
        req.app.locals.isMessage = false
        res.send(data)
    })
})

router.get('/home',(req,res)=>{
    if (req.session.loggedIn) {
        if (!req.app.locals.isMessage) {
            req.app.locals.message = ''
        }

        ejs.renderFile('views/home.ejs', { app: config.appconfig, err: req.app.locals, user: req.session }, (err, data) => {
            req.app.locals.isMessage = false
            res.send(data)
        });
    } else {
        res.redirect('/')
    }
})

router.get('/newdata',(req,res)=>{
    if (req.session.loggedIn) {
        if (!req.app.locals.isMessage) {
            req.app.locals.message = ''
        }
        pool.query('SELECT * FROM spendingtypes ',(error,results)=>{

            if (error) {
                res.status(500).send(error)
            }
            else{
                ejs.renderFile('views/newdata.ejs', { app: config.appconfig, err: req.app.locals, user: req.session,types:results }, (err, data) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    else{
                        req.app.locals.isMessage = false
                        res.status(500).send(data)
                    }
                })
            }
        })
    } else {
        res.redirect('/');
    }
})

router.get('/flowchart',(req,res)=>{
    if (req.session.loggedIn) {
        if (!req.app.locals.isMessage) {
            req.app.locals.message = ''
        }
        let thismonth=moment(new Date).format('YYYY-MM')
        pool.query(`SELECT * FROM spendings INNER JOIN spendingtypes on spendings.typeID=spendingtypes.ID WHERE UID=${req.session.userid} and date Like "${thismonth}-%"`,(error,results)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error)
            }
            else{
                ejs.renderFile('views/flowchart.ejs', { app: config.appconfig, err: req.app.locals, user: req.session, chartdata:results }, (err, data) => {
                req.app.locals.isMessage = false
                    console.log(results)
                    res.send(data)
                });
            }    
        })
    } else {
        res.redirect('/')
    }
})

router.get('/tableview',(req,res)=>{
    if (req.session.loggedIn) {
        if (!req.app.locals.isMessage) {
            req.app.locals.message = ''
        }
        let thismonth=moment(new Date).format('YYYY-MM')
        pool.query(`SELECT * FROM spendings INNER JOIN spendingtypes on spendings.typeID=spendingtypes.ID WHERE UID=${req.session.userid} and date Like "${thismonth}-%"`,(error,results)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error)
            }
            else{
                ejs.renderFile('views/table.ejs', { app: config.appconfig, err: req.app.locals, user: req.session, chartdata:results }, (err, data) => {
                    req.app.locals.isMessage = false
                    console.log(results)
                    res.send(data)
                });
            }    
        })
    } else {
        res.redirect('/')
    }
})

router.get('/calendar',(req,res)=>{
    if (req.session.loggedIn) {
        if (!req.app.locals.isMessage) {
            req.app.locals.message = ''
        }

        pool.query(`SELECT * FROM spendings INNER JOIN spendingtypes on spendings.typeID=spendingtypes.ID WHERE UID=${req.session.userid}`,(error,results)=>{
            if (error) {
                console.log(error)
                res.status(500).send(error)
            }
            else{
                ejs.renderFile('views/calendar.ejs', { app: config.appconfig, err: req.app.locals, user: req.session, calendardata:results }, (err, data) => {
                    req.app.locals.isMessage = false
                    console.log(results)
                    res.send(data)
                });
            }    
        })
    } else {
        res.redirect('/')
    }
})

module.exports = router;