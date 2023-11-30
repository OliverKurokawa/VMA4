let mongoose = require('mongoose');

let coffeeModel = mongoose.Schema({
    beanType: String,
    roastLevel: String,
    roastDate: String,
    pricePerKg: String,
    brewGuide: String
    

},
{
    collection:'coffee'
});

module.exports = mongoose.model('Coffee', coffeeModel);
