let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Coffee = require('../models/coffee')

let passport = require('passport');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


let coffeeController = require('../controllers/coffee')

router.get('/', coffeeController.displayCoffeeList);

router.get('/add',requireAuth,coffeeController.displayAddPage);

router.post('/add',requireAuth,coffeeController.processAddPage);

router.get('/edit/:id',requireAuth,coffeeController.displayEditPage);

router.post('/edit/:id',requireAuth,coffeeController.processEditPage);

router.get('/delete/:id',requireAuth,coffeeController.performDelete);

module.exports = router;