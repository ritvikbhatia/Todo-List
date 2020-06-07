//required modules
const express=require('express');

//port defination 
const port=8000;

const app=express();

app.use('/',require('./routes/index'))

app.listen(port);
