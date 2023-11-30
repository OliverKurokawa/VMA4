let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Medical_profile = require('../models/medical_profile')

let passport = require('passport');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
router.get('/',Medical_profileController.displayMedical_profile);

let Medical_profileController = require('../controllers/medical_profile');
const { route } = require('./users');
module.exports = router;
