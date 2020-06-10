//Require Mongoose
var mongoose = require('mongoose');

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
    }
});

var Tasks = mongoose.model('Tasks', taskSchema );

module.exports=Tasks;