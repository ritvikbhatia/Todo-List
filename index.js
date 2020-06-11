//required modules
const express=require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const expressLayouts=require('express-ejs-layouts');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const session = require('express-session');
var db = mongoose.connection;
var bodyParser = require('body-parser')
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);

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
app.use(cookieParser());


app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use(expressLayouts);

app.set("layout extractScripts", true)
app.set("layout extractStyles", true)



app.use('/',require('./routes/index'))

app.listen(port);
