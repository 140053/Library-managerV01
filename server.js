require('dotenv').config();

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 80





//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//routes
var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route


app.use('/t1',require('./app/routes/t1'));


app.listen(port,()=>{
  console.log(`Example app listening at http://localhost:${port}`)
});