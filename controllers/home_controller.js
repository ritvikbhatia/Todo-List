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
            data:req.body,
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