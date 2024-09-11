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
            return res.status(400).json({"message": "Lỗi"});
        }
        return res.status(200).json({"message": "Thêm thành công"});
    })
}

const readMovies = (req, res) => {
    //const sql = `select * from movie`;
    const sql = `select m.*, count(e.episode) AS total_episodes 
    from movie m left join episodes e on m.movie_id = e.movie_id
    group by m.movie_id`
    connection.query(sql, function(err, results){
        if (err){
            console.log(err);
            return res.status(400).json({"message": "Lỗi"});
        }
        return res.status(200).json(results);
    })
}

const readEpisodesOfAMovie = (req, res) => {
    let sql = `select * from episodes where movie_id = ? order by episode asc`
    let parameters = [req.params.movieId]
    connection.query(sql, parameters, function(err, result){
        if (err){
            console.log(err);
            return res.status(400).json({"message": "Lỗi"});
        }
        return res.status(200).json(result);
    })
}

const readMovieWithId = (req, res) => {
    const sql = `select * from movie where movie_id = ?`
    connection.query(sql, [req.params.movieId], function(err, result){
        if (err){
            console.log(err);
            return res.status(400).json({"message": "Lỗi"});
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
                return res.status(400).json({"message": "Lỗi"});
            }
            return res.status(200).json({"message": "Sửa thành công"});
        })
    } else return res.status(400).json({"message": "Phải có ít nhất 1 tham số truyền vào để chỉnh sửa"});
}

const updateEpisode = (req, res) => {
    let { video_provider_url } = req.body;
    let sql = `update episodes 
    set video_provider_url = ? 
    where movie_id = ? and episode = ?`
    let parameters = [video_provider_url, req.params.movieId, req.params.episode];

    connection.query(sql, parameters, function(err, results){
        if (err){
            //console.log(err)
            return res.status(400).json({"message": "Lỗi", "error": err});
        }
        return res.status(200).json({"message": "Sửa thành công", "results": results});
    })
}

const addNewEpisodeWithMovieId = (req, res) => {
    let {episode, video_provider_url} = req.body;
    let sql = `insert into episodes (episode, video_provider_url, movie_id) value (?,?,?)`;
    connection.query(sql, [episode, video_provider_url, req.params.movieId], function(err, result){
        if (err) {
            //console.log(err)
            if (err.errno == 1305) {
                return res.status(400).json({"Error": "Tập phim đã tồn tại trong cơ sở dữ liệu!"})
            }
            return res.status(400).json({"message": "Lỗi", "Error": err});
        }
        return res.status(200).json({"message": "Thêm thành công", "result": result});
    })
}

const deleteEpisode = (req, res) => {
    let sql = `delete from episodes where movie_id = ? and episode = ?`
    let parameters = [req.params.movieId, req.params.episode]
    connection.query(sql, parameters, function (err, result) {
        if (err) {
            return res.status(400).json({ "message": "Lỗi", "error": err });
        }
        return res.status(200).json({ "message": "Xoá thành công", "result": result});
    })
}

const deleteMovie = (req, res) => {
    let sql = `delete from movie where movie_id = ?`
    let parameters = [req.params.movieId]
    connection.query(sql, parameters, function(err, result){
        if (err) {
            return res.status(400).json({ "message": "Lỗi", "error": err });
        }
        return res.status(200).json({ "message": "Xoá thành công", "result": result});
    })
}

module.exports = {
    addNewMovie, readMovies, readMovieWithId, updateMovieWithId, addNewEpisodeWithMovieId, deleteEpisode, deleteMovie, readEpisodesOfAMovie, updateEpisode
}