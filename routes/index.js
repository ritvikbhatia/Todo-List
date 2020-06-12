// ****************************************************************************
// required modules

const express=require('express');
const passport = require('passport');
const home_controller=require('../controllers/home_controller');

// ******************************************************************************
//using router
const router=express.Router();


//calling the routes
router.get('/',passport.checkAuthentication, home_controller.home);
router.post('/addTask',home_controller.add);
router.get('/showTasks',home_controller.showTasks);
router.post('/delTasks',home_controller.delTasks);
router.post('/delAll',home_controller.delAll);
router.get('/signout',home_controller.destroySession);
router.get('/signup',home_controller.signup);
router.get('/signin',home_controller.signin);
router.post('/create',home_controller.create);


// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/signin'},
), home_controller.createSession);



//exporting router
module.exports=router;