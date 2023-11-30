let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


let Coffee = require('../models/coffee');

module.exports.displayCoffeeList = (req, res, next) => {
    Coffee.find((err, CoffeeList) => {
       if(err)
       {
           return console.error(err);
       }
       else
       {
           res.render('coffee/list', {
                title: 'Coffee', 
                CoffeeList: CoffeeList, 
                displayName: req.user ? req.user.displayName : ''
            });
       }
   });
}

module.exports.displayAddPage = (req,res,next) =>{
    res.render('coffee/add', {
        title: 'Add Coffee',
        displayName: req.user ? req.user.displayName : ''
    });
}

module.exports.processAddPage = (req,res,next) =>{
    let newcoffee = Coffee({
        "beanType": req.body.beanType,
        "roastLevel": req.body.roastLevel,
        "roastDate": req.body.roastDate,
        "pricePerKg": req.body.pricePerKg,
        "brewGuide": req.body.brewGuide
    })
    Coffee.create(newcoffee,(err,Coffee) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/coffee-list');
        }
    });
}

module.exports.displayEditPage = (req,res,next) =>{
    let id = req.params.id;

    Coffee.findById(id,(err,coffeeToEdit) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.render('coffee/edit',{
                title: 'Edit Coffee', 
                coffee: coffeeToEdit,
                displayName: req.user ? req.user.displayName : ''
            });
            
        }
    });
}

module.exports.processEditPage = (req,res,next) =>{
    let id = req.params.id

    let updatedcoffee = Coffee({
        "_id":id,
        "beanType": req.body.beanType,
        "roastLevel": req.body.roastLevel,
        "roastDate": req.body.roastDate,
        "pricePerKg": req.body.pricePerKg,
        "brewGuide": req.body.brewGuide

    });

    Coffee.updateOne({_id: id}, updatedcoffee,(err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/coffee-list');
        }
    });
}

module.exports.performDelete = (req,res,next) =>{
    let id = req.params.id

    Coffee.remove({_id:id},(err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/coffee-list');
        }
    });

}