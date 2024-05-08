//import libs
require('dotenv').config()
const express = require('express')
const path = require('path')


//import files
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database')


//
const app = express()
const port = process.env.PORT || 8080

//config
configViewEngine(app);

//route
app.use('/v1', webRoutes);



// A simple SELECT query
connection.query(
  'SELECT * FROM movie_app.movies',
  function (err, results, fields) {
    console.log(">>> results: ",results); // results contains rows returned by server
  }
);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})