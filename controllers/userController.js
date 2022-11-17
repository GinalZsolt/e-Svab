const express = require('express')
const router = express.Router()
const config = require('../config.js')
const sha1 = require('sha1')
var mysql = require('mysql')

var pool = mysql.createPool(config.dbconfig)

router.post('/login',(req,res)=>{
    let userdata = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(req.body)
    req.app.locals.isMessage = true;
    if (userdata.email==''||userdata.password=='') {
        req.app.locals.message = 'Nincs minden mező kitöltve!'
        req.app.locals.messagetype = 'danger'
        res.redirect('/')
    }
    else{
        pool.query(`SELECT * FROM users WHERE email=? AND password=?`,[userdata.email,sha1(userdata.password)],(err,results)=>{
            if (results.length == 0) {
                req.app.locals.message = 'Hibás belépési adatok!'
                req.app.locals.messagetype = 'danger'
                res.redirect('/');
            } else {
                if (results[0].status == 0) {
                    req.app.locals.message = 'Ez a felhasználó ki lett tiltva!'
                    req.app.locals.messagetype = 'danger'
                    res.redirect('/');
                } else {
                    req.session.loggedIn = true;
                    req.session.userid = results[0].ID;
                    req.session.username = results[0].name;
                    req.session.useermail = results[0].email;
                    req.app.locals.message = 'Sikeres belépés!'
                    req.app.locals.messagetype = 'success'
                    res.redirect('/home')
                }
            }
        })
    }
})

router.get('/logout',(req,res)=>{
    req.session.loggedIn = false;
    res.redirect('/')
})

router.post('/reg',(req,res)=>{
    let newuser={
        username:req.body.name,
        email:req.body.email,
        password:req.body.password,
        password2:req.body.password2
    }

    req.app.locals.isMessage = true;

    if(newuser.email==""||newuser.username==""||newuser.password==""||newuser.password2==""){
        req.app.locals.message = 'Nincs minden mező kitöltve!'
        req.app.locals.messagetype = 'danger'
        res.redirect('/reg')
    }
    else {
        if (newuser.password!=newuser.password2) {
        req.app.locals.message = 'Nem egyezik a két jelszó!'
        req.app.locals.messagetype = 'danger'
        res.redirect('/reg')
        }
        else{
            let pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
            if(!newuser.password==(pattern)){
                req.app.locals.message = 'A jelszó túl gyenge!'
                req.app.locals.messagetype = 'danger'
                res.redirect('/reg')
            }
            else{
                pool.query('SELECT ID FROM users WHERE email=?',[newuser.email],(err,results)=>{
                    if(err){
                        console.log(err)
                        res.send("BAJ")
                    }else{
                        if(results.length!=0){
                            req.app.locals.message = 'Ez az Email m,ár foglalt!'
                            req.app.locals.messagetype = 'danger'
                            res.redirect('/reg')
                        }
                        else{
                            pool.query('INSERT INTO users( name, email, password, reg, status) VALUES (?,?,?,CURRENT_TIMESTAMP,1)',[newuser.username,newuser.email,sha1(newuser.password)],(err,results)=>{
                                req.app.locals.message = 'Sikeres regisztráció!'
                                req.app.locals.messagetype = 'success'
                                res.redirect('/')
                            })
                        }
                    }
                })
            }
        }
    }
})

router.post('/passmod',(req,res)=>{
    
    req.app.locals.isMessage = true
    
    if (req.body.pass1==""||req.body.pass2=="") {
            req.app.locals.message = 'Nincs minden mező kitöltve'
            req.app.locals.messagetype = 'danger'
            res.redirect('/passmod')
    }
    else{
        if (req.body.pass1!=req.body.pass2) {
            req.app.locals.message = 'Nem egyezik a két jelszó'
            req.app.locals.messagetype = 'danger'
            res.redirect('/passmod')
        }
        else{
            let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            if(!req.body.pass1==(pattern)){
                req.app.locals.message = 'A jelszó túl gyenge!'
                req.app.locals.messagetype = 'danger'
                res.redirect('/passmod')
            }else{
                pool.query('Select password from users where ID=?',[req.session.userid],(err,results)=>{
                    if (err) {
                        res.status(200).send(err.message)
                    }
                    else{
                        if (sha1(req.body.pass1)==results[0].password) {
                            req.app.locals.message = 'A jelszó megegyezik a régivel!'
                            req.app.locals.messagetype = 'danger'
                            res.redirect('/passmod')
                        }
                        else{
                            pool.query('UPDATE users SET password=? WHERE ID=?',[sha1(req.body.pass1),req.session.userid],(err,results)=>{
                                if (err) {
                                    res.status(200).send(err.message)
                                }
                                else{
                                    req.app.locals.message = 'Sikeres frissítés'
                                    req.app.locals.messagetype = 'success'
                                    res.redirect('/passmod')
                                }
                            })
                        }
                    }
                })
            }
        }
    }
})
module.exports = router;