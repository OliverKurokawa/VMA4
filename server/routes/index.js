var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

router.get('/',indexController.displayHomePage);

router.get('/homepage',indexController.displayHomePage);

router.post('/home', indexController.displayHomePage);


/* GET About*/
router.get('/about', indexController.displayAboutPage);

/* GET Products*/
router.get('/products',indexController.displayProductsPage);

/* GET Services*/
router.get('/services',indexController.displayProductsPage);

/* GET Contact Us */
router.get('/contact', indexController.displayServicesPage);

router.get('/login', indexController.displayLoginpage);

router.post('/login', indexController.processLoginPage);

router.get('/register', indexController.displayRegisterPage);

router.post('/register', indexController.processRegisterPage);

router.get('/logout', indexController.performLogout);



module.exports = router;
