//required modules
const express=require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const expressLayouts=require('express-ejs-layouts');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
var bodyParser = require('body-parser')
const passport = require('passport');
const passportLocal = require('./config/passport-local');

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

//port defination 
const port=8000;

const app=express();

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    indentedSyntax:false,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(bodyParser.urlencoded())

app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);

app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'))

app.listen(port);
