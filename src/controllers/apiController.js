const connection = require("../config/database");

const addNewMovie = (req, res) => {
    let { title, original_title, status, image_url, description } = req.body;
    const sql = `insert into movie
    (title, original_title, status, image_url, description) 
    VALUE (?,?,?,?,?)`
    connection.query(sql, [title, original_title, status, image_url, description],
    function (err, results) {
        if (err) {
            console.log(err)
            res.send("Lỗi");
            return res.status(400);
        }
        console.log(results);
        res.send("Thêm thành công");
        return res.status(200);
    })
}

const readMovies = (req, res) => {
    let movies = [];
    const sql = `select * from movie`;
    connection.query(sql, function(err, results){
        if (err){
            res.send("Lỗi khi lấy dữ liệu!");
            console.log(err);
            return res.status(400);
        }
        movies = results;
        res.send(JSON.stringify(movies));
        return res.status(200);
    })
}

const readMovieWithId = (req, res) => {
    const sql = `select * from movie where movie_id = ?`
    connection.query(sql, [req.params.movieId], function(err, result){
        if (err){
            res.send("Lỗi khi lấy dữ liệu!");
            console.log(err);
            return res.status(400);
        }
        let movie = result;
        res.send(JSON.stringify(movie));
        return res.status(200);
    })
}

const updateMovieWithId = (req, res) => {
    sql = `update movie set title = ?, original_title = ?, status = ?, image_url = ?, description = ? where movie_id = ?`
    let { title, original_title, status, image_url, description } = req.body;
    connection.query(sql, [title, original_title, status, image_url, description, req.params.movieId], function(err, results){
        if (err){
            console.log(err)
            res.send("Lỗi");
            return res.status(400);
        }
        res.send("Sửa thành công");
        return res.status(200);
    })
}

module.exports = {
    addNewMovie, readMovies, readMovieWithId, updateMovieWithId
}