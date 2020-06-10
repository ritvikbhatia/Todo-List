const Tasks=require('../models/tasks');
module.exports.home=function(req,res){
    res.render('home.ejs')
}

module.exports.add=async function(req,res){
    // console.log('****',req.body)
    let task=await Tasks.create(req.body);
    let tasks= await Tasks.find({});
    // console.log(tasks);
    if(req.xhr)
    {
        res.status(200).json({
            data:tasks,
            message:"success xhr"
        })
    }
    console.log('success fully added to db');
    return;
    // res.redirect('back')
}