//required modules
const express=require('express');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const expressLayouts=require('express-ejs-layouts');

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

app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);

app.set("layout extractScripts", true)
app.set("layout extractStyles", true)

app.use('/',require('./routes/index'))

app.listen(port);
