//Require Mongoose
var mongoose = require('mongoose');
var user=require('./user');

//Define a schema
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  description: {
      type:String,
      required:true
  },
  date: {
      type:Date,
      required:true
    },
category:{
        type:String,
      required:true
    },
    user:{
      type:Schema.Types.ObjectId,
      ref:user
    }
},{
  timestamps:true
});

var Tasks = mongoose.model('Tasks', taskSchema );

module.exports=Tasks;