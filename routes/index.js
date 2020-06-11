const express=require('express');
const passport = require('passport');
const home_controller=require('../controllers/home_controller');

const router=express.Router();

router.get('/',passport.checkAuthentication, home_controller.home);
router.post('/addTask',home_controller.add);
router.get('/showTasks',home_controller.showTasks);
router.post('/delTasks',home_controller.delTasks);
router.get('/signup',home_controller.signup);
router.get('/signin',home_controller.signin);
router.post('/create',home_controller.create);
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/signin'},
), home_controller.createSession);


router.get('/signout',home_controller.destroySession);

module.exports=router;