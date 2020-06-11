const Tasks=require('../models/tasks');
module.exports.home=function(req,res){
    res.render('home.ejs')
}

module.exports.add=async function(req,res){
    // console.log('****',req.body)
    let task=await Tasks.create(req.body);
    // console.log(tasks);
    if(req.xhr)
    {
        res.status(200).json({
            data:task,
            message:"success xhr"
        })
    }
    console.log('success fully added to db');
    return;
}
module.exports.showTasks=async function(req,res){

    let tasks= await Tasks.find({});
    // console.log(tasks);
    if(req.xhr)
    {
        res.status(200).json({
            data:tasks,
            message:"success xhr"
        })
    }
    return;
}

module.exports.delTasks=async function(req,res){

    console.log(req.body);
    for(let i of req.body.del)
    {
        await Tasks.findByIdAndDelete(i);
    }
    let tasks= await Tasks.find({});
    // console.log(tasks);
    if(req.xhr)
    {
        res.status(200).json({
            data:tasks,
            message:"success xhr"
        })
    }
    return;
}

module.exports.signup=function(req,res){
    return res.render('user_sign_up.ejs');
}

module.exports.signin=function(req,res){
    return res.render('user_sign_in.ejs');
}