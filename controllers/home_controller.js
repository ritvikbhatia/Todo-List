/* **********************************************************************************/
//Require modules

const Tasks=require('../models/tasks');
const User=require('../models/user');


/* **********************************************************************************/
//render homepage

module.exports.home=function(req,res){
    res.render('home.ejs')
}


/* **********************************************************************************/
//adding  tasks to db

module.exports.add=async function(req,res){
    let task=await Tasks.create(req.body);
    if(req.xhr)
    {
        req.flash('success', 'Task Updated');
        res.status(200).json({
            data:task,
            message:"success xhr"
        })
    }
    return;
}


/* **********************************************************************************/
//Displaying tasks

module.exports.showTasks=async function(req,res){

    let tasks= await Tasks.find({});
    if(req.xhr)
    {
        res.status(200).json({
            data:tasks,
            message:"success xhr"
        })
    }
    return;
}


/* **********************************************************************************/
//Deleting Tasks from the database

module.exports.delTasks=async function(req,res){

    for(let i of req.body.del)
    {
        await Tasks.findByIdAndDelete(i);
    }
    let tasks= await Tasks.find({});
    if(req.xhr)
    {
        req.flash('success', 'Tasks Deleted');
        res.status(200).json({
            data:tasks,
            message:"success xhr"
        })
    }
    return;
}

/* **********************************************************************************/
//Deleting All Tasks from the database

module.exports.delAll=async function(req,res){

    await Tasks.deleteMany({});
    if(req.xhr)
    {
        req.flash('success', 'Tasks Deleted');
        res.status(200).json({
            message:"success xhr"
        })
    }
    return;
}


/* **********************************************************************************/
//render signup page

module.exports.signup=function(req,res){
    return res.render('user_sign_up.ejs');
}


/* **********************************************************************************/
//render signin page

module.exports.signin=function(req,res){
    return res.render('user_sign_in.ejs');
}


/* **********************************************************************************/
// get the sign up data and create account

module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}
                return res.redirect('/signin');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('/');
        }

    });
}


/* **********************************************************************************/
// sign in and create a session for the user

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}


/* **********************************************************************************/
//signout and destroy session

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}


/* **********************************************************************************/