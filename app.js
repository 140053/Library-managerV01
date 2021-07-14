require('dotenv').config();

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000

const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload');



//middleware
app.use(session({
    secret: 'seckret-key',
    resave: false,
    saveUninitialized: true
  }));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// default options
app.use(fileUpload());



//templating engine
app.use(expressLayouts);
app.set('layout', './layouts/default')

//path to the view 
app.set('views',path.join(__dirname,'app/views'));
app.set('view engine', 'ejs');

//static files

app.use('/assets',express.static(path.join(__dirname,'node_modules')));
app.use(express.static(path.join(__dirname, 'app/public')));

//routes

//---- index
app.use('/',require("./app/routes/default"));


app.use('/api',require("./app/routes/api"));





app.listen(port,()=>{
  console.log(`Example app listening at http://localhost:${port}`)
});
