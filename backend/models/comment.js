const mysql = require('mysql');
const db = require('../connection');

class Comment {
    constructor(author, comment, postId, userId){
        this.author = author,
        this.comment = comment,
        this.postId = postId, 
        this.userId = userId
    }

    static find(postId){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM comment WHERE postId = ?';
            db.query(sql, postId, (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(result);
            })
        })
    }

    static delete(commentId){
            return new Promise((resolve, reject) => {
                db.query('DELETE FROM comment WHERE id = ?', [commentId], err => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve()
                })
            })
        }

    save(){
        return new Promise((resolve, reject) => {
            let comment = [this.author, this.comment, this.postId, this.userId];
            let sql = 'INSERT INTO comment SET author = ?, comment = ?, postId = ?, authorId = ?, publishDate = NOW()';
            db.query(sql, comment, err =>{
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
                    let insert = [+1, this.postId]
                    db.query('UPDATE post SET commentsNumber = commentsNumber + ? WHERE id = ?', insert, (err, res) => {
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
    }
}

module.exports = Comment;