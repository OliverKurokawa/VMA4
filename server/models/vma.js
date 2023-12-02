let mongoose = require('mongoose');

let vmaModel = mongoose.Schema({
    Name: String,
    DOB: String,
    Record: String,

},
{
    collection:'vma'
});

module.exports = mongoose.model('Vma', vmaModel);
