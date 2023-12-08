let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let vmaController = require('../controllers/vma')

let passport = require('passport');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}



router.get('/', vmaController.displaymedical_profilePage);
router.get('/add',requireAuth,vmaController.displayvmaAddPage);
router.post('/add',requireAuth,vmaController.processvmaAddPage);

// route to show the appointment page
router.get('/makeAppointment', vmaController.displayAppointmentPage);
router.post('/addappointment', vmaController.processAppointment);
router.get('/appointmentSuccess', vmaController.displayAppointmentSuccessPage);

module.exports = router;