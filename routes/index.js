const express=require('express');
const home_controller=require('../controllers/home_controller');

const router=express.Router();

router.get('/',home_controller.home);
router.post('/addTask',home_controller.add);
router.get('/showTasks',home_controller.showTasks);

module.exports=router;