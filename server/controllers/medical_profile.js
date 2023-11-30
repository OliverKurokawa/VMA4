let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

module.exports.displayMedical_profile = (req, res, next) => {
    Coffee.find((err, Medical_profile) => {
       if(err)
       {
           return console.error(err);
       }
       else
       {
           res.render('medical_profile/medical_profile', {
                title: 'Medical Profile', 
                Medical_profile: Medical_profile, 
                displayName: req.user ? req.user.username : ''
            });
       }
   });
}

let medical_profileModel = require('../models/medical_profile');
let medical_profile = medical_profileModel.medical_profile;
