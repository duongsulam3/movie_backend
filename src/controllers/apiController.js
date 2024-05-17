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
            return res.status(400).json({message: "Lỗi"});
        }
        return res.status(200).json({message: "Thêm thành công"});
    })
}

const readMovies = (req, res) => {
    let movies = [];
    //const sql = `select * from movie`;
    const sql = `select m.*, count(e.episode) AS total_episodes 
    from movie m left join episodes e on m.movie_id = e.movie_id
    group by m.movie_id`
    connection.query(sql, function(err, results){
        if (err){
            console.log(err);
            return res.status(400).json({message: "Lỗi"});
        }
        return res.status(200).json(results);
    })
}

const readMovieWithId = (req, res) => {
    const sql = `select * from movie where movie_id = ?`
    connection.query(sql, [req.params.movieId], function(err, result){
        if (err){
            console.log(err);
            return res.status(400).json({message: "Lỗi"});
        }
        return res.status(200).json(result);
    })
}

const updateMovieWithId = (req, res) => {
    let { title, original_title, status, image_url, description } = req.body;
    let sql = `update movie set `
    let parameters = [];

    //Kiểm tra nếu có tham số truyền vào
    if (title) {
        sql += `title = ?, `
        parameters.push(title);
    }
    if(original_title){
        sql += `original_title = ?, `
        parameters.push(original_title)
    }
    if(status){
        sql += `status = ?, `
        parameters.push(status)
    }
    if(image_url){
        sql += `image_url = ?, `
        parameters.push(image_url)
    }
    if(description){
        sql += `description = ?`
        parameters.push(description)
    }

    //Bỏ dấu , ở sau cùng
    sql = sql.slice(0, -2);

    //Thêm tham số điều kiện
    sql += " where movie_id = ?";
    parameters.push(req.params.movieId)


    // const parameters = [title, original_title, status, image_url, description, req.params.movieId];
    if ( parameters.length > 1 ) {
        connection.query(sql, parameters, function(err, results){
            if (err){
                console.log(err)
                return res.status(400).json({message: "Lỗi"});
            }
            return res.status(200).json({message: "Sửa thành công"});
        })
    } else return res.status(400).json({message: "Phải có ít nhất 1 tham số truyền vào để chỉnh sửa"});
}

const addNewEpisodeWithMovieId = (req, res) => {
    let {episode, video_provider_url} = req.body;
    let sql = `insert into episodes (episode, video_provider_url, movie_id) value (?,?,?)`;
    connection.query(sql, [episode, video_provider_url, req.params.movieId], function(err, result){
        if (err) {
            console.log(err)
            return res.status(400).json({message: "Lỗi"});
        }
        return res.status(200).json({message: "Thêm thành công"});
    })
}

module.exports = {
    addNewMovie, readMovies, readMovieWithId, updateMovieWithId, addNewEpisodeWithMovieId
}