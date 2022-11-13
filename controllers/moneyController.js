const express = require('express')
const router = express.Router()
const config = require('../config.js')
const moment = require('moment')
var mysql = require('mysql')
var pool = mysql.createPool(config.dbconfig)

router.post('/newdata',(req,res)=>{
    let spending = {
        UID:req.session.userid ,
        typeID:req.body.typeID,
        amount:req.body.amount,
        date:req.body.date
    }

    req.app.locals.isMessage = true;
    console.log(spending)

    if (spending.amount==''||spending.date=='') {
        req.app.locals.message = 'Nincs minden mező kitöltve!'
        req.app.locals.messagetype = 'danger'
        res.redirect('/newdata')
    }
    else{
        pool.query("INSERT INTO `spendings`( `UID`, `typeID`, `amount`, `date`) VALUES (?,?,?,?)",[spending.UID,spending.typeID,spending.amount,spending.date],(error,results)=>{
            if (error) {
                res.status(500).send(error)
            }
            else{
                req.app.locals.message = 'Sikeres Feltöltés'
                req.app.locals.messagetype = 'success'
                res.redirect('/newdata')
            }
        })
    }
})

module.exports = router