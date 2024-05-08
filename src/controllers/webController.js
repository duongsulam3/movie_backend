const getHelloWorld = (req, res) => {
    res.send('Hello World!');
}

const getTest = (req, res) => {
    res.render('example')
}

module.exports = {
    getHelloWorld, getTest
}