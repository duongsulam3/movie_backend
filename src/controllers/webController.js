const connection = require("../config/database");


const getTest = (req, res) => {
    res.render('example')
}


module.exports = {
     getTest
}