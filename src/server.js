//import libs
require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser  = require('body-parser')


//import files
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const connection = require('./config/database')


//
const app = express()
const port = process.env.PORT || 8080

//config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//config
configViewEngine(app);


//route
app.use('/v1', webRoutes)
app.use('/api', apiRoutes)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})