const Tasks=require('../models/tasks');
module.exports.home=function(req,res){
    res.render('home.ejs')
}

module.exports.add=function(req,res){
    console.log('****',req.body)
    let task=Tasks.create(req.body);
    if(req.xhr)
    {
        res.status(200).json({
            data:task,
            message:"success xhr"
        })
    }
    console.log('success fully added to db');
    return;
    // res.redirect('back')
}