let mongoose = require('mongoose');

let medical_profileModel = mongoose.Schema({
    name: String,
    DOB: Date,
    Record: String,
},
{
    collection:'medical_profile'
});

module.exports = mongoose.model('Medical_profile', medical_profileModel);
