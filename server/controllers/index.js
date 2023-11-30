let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req,res,next) =>{
    res.render('index',{title:'Home', username: req.user ? req.user.username : ''});
}

module.exports.displayAboutPage = (req,res,next) =>{
    res.render('aboutMe',{title:'About', username: req.user ? req.user.username : ''});
}

module.exports.displayProductsPage = (req,res,next) =>{
    res.render('products',{title:'Products', username: req.user ? req.user.username : ''});
}

module.exports.displayServicesPage = (req,res,next) =>{
    res.render('services',{title:'Services', username: req.user ? req.user.username : ''});
}

module.exports.displayContactPage = (req,res,next) =>{
    res.render('contact',{title:'Contact', username: req.user ? req.user.username : ''});
}

module.exports.displayLoginpage = (req,res,next) => {
    if(!req.user){
        res.render('auth/login',
        {
            title: "Login",
           messages: req.flash('loginMessage'),
           username: req.user ? req.user.username : '' 
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           username: req.user ? req.user.username : '' 
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        if(err)
        {
            return next(err);
        }
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                username: user.username,
                email: user.email
            }


            return res.redirect('/');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            username: req.user ? req.user.username : ''
        });
    }
    else
    {
        return res.redirect('/business-contact-list');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        username: req.body.username
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                username: req.user ? req.user.username : ''
            });
        }
        else
        {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
}