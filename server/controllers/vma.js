let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Vma = require('../models/vma');


module.exports.displaymedical_profilePage = (req, res, next) => {
    Vma.find((err, VmaList) => {
       if(err)
       {
           return console.error(err);
       }
       else
       {
           res.render('vma/medicalprofile', {
                title: 'Medical', 
                VmaList: VmaList, 
                username: req.user ? req.user.username : '',
                role: req.user ? req.user.role : ''
            });
       }
   });
}
module.exports.displayvmaAddPage = (req,res,next) =>{
    res.render('vma/add', {
        title: 'Add Medcial record',
        username: req.user ? req.user.username : ''
    });
}

module.exports.processvmaAddPage = (req,res,next) =>{
    let newrecord = Vma({
        "Name": req.body.name,
        "DOB": req.body.dob,
        "Record": req.body.record,
    })
    Vma.create(newrecord,(err,Vma) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/vma');
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

module.exports.processvmaEditPage = (req,res,next) =>{
    let id = req.params.id

    let updatedrecord = Vma({
        "_id":id,
        "Name": req.body.name,
        "DOB": req.body.dob,
        "Record": req.body.record
    });

    Vma.updateOne({_id: id}, updatedrecord,(err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/vma');
        }
    });
}

module.exports.performDelete = (req,res,next) =>{
    let id = req.params.id

    Vma.remove({_id:id},(err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/vma');
        }
    });

}
