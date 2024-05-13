const connection = require("../config/database");

const getHelloWorld = (req, res) => {
    let movies = [];
    connection.query(
        'SELECT * FROM movie_app.movies',
        function (err, results, fields) {
            movies = results;
            //console.log(">>> results: ", results); // results contains rows returned by server
            res.send(JSON.stringify(movies));
        }
    );
    
}

const getTest = (req, res) => {
    res.render('example')
}


module.exports = {
    getHelloWorld, getTest
}