const mysql = require('mysql');
const db = require('../connection');
const { use } = require('../routes/user');

class Post {
    constructor(author, userId, post, commentsNumber, likes, imageUrl) {
        this.author = author,
        this.userId = userId,
        this.post = post,
        this.commentsNumber = commentsNumber,
        this.likes = likes,
        this.imageUrl = imageUrl
    }

    static find() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM post", (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(result);
            })  
        })
    }

    static findOneById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM post WHERE id = ?", [id], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(result[0]);
            }) 
        })
    }
    
    static delete(Postid) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM post WHERE id = ?", Postid, err => {
                if (err) {
                    return reject(err);
                }
                return resolve()
            })
            db.query('DELETE FROM comment WHERE postId = ?', Postid, err => {
                if (err) {
                    return reject(err);
                }
                return resolve()
            })
        }) 
    };

    save() {
        return new Promise((resolve, reject) => {
            let post = [this.post, this.author, this.userId, this.commentsNumber, this.likes, this.imageUrl];
            let sql = "INSERT INTO post SET post = ?, author = ?, authorId = ?, commentsNumber = ?, likes = ?, imageUrl = ?, publishDate = NOW()"
            db.query(sql, post, err => {
                    if (err) {
                        return reject(err)
                    }else{
                        db.query("SELECT LAST_INSERT_ID()", [], (err, res) => {
                            if (err) {
                                return reject(err)
                            }else{
                                this.id = res;
                                return resolve()
                            }
                        })
                    }
                })
        })    
    };

    static adjustCommentsNumber(postId){
        return new Promise((resolve, reject) => {
            let insert = [-1, postId]
            db.query('UPDATE post SET commentsNumber = commentsNumber + ? WHERE id = ?', insert, (err, res) => {
                if (err) {
                    return reject(err)
                }else{
                    this.id = res;
                    return resolve()
                }
            })
        })
    }

    //dislike represente la suppression du like.
    dislike(user_id) {
        return new Promise((resolve, reject) => {
            let like = [user_id, this.id];
            let sql = "DELETE FROM likes WHERE user_id = ? AND post_id = ? "

            db.query(sql, like, err => {
                if (err) {
                    return reject(err)
                }else{
                    return resolve()
                }
            })
        })     
    };

    findLiked(){
        return new Promise((resolve, reject) => {
            let postId = postId;
            let sql = 'SELECT * FROM like WHERE postId = ?'

            db.query(sql, like, err => {
                if (err){
                    return reject(err)
                } else{
                    return resolve()
                }
            })
        })
    }

    like(postId){
        return new Promise((resolve, reject) => {
            let like = [postId, +1];
            let sql = "INSERT INTO post WHERE id = ? SET likes = ?"
            
            db.query(sql, like, err => {
                if (err) {
                    return reject(err)
                }else{
                    return resolve()
                }
            })
        })    
    };

    dislike(postId){
        return new Promise((resolve, reject) => {
            let dislike = [postId, -1];
            let sql = 'INSERT INTO post WHERE id = ? SET likes = ?'

            db.query(sql, dislike, err => {
                if (err) {
                    return reject(err)
                } else{
                    return resolve()
                }
            })
        })
    }
}

module.exports = Post;
