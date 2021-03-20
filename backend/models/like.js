const mysql = require('mysql');
const db = require('../connection');

class Like {
    constructor(userId, postId){
        this.userId = userId,
        this.postId = postId
    }

    static findOne(likedId){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM likes WHERE postId = ? AND userId = ?'
            let insert = [likedId.postId, likedId.userId]

            db.query(sql, insert, (err, result) => {
                if (err){
                    return reject(err)
                } else{
                    return resolve(result[0])
                }
            })
        })
    }

    static delete(likedId){
        console.log(likedId)
        return new Promise((resolve, reject) => {
           
            let dislike = [likedId.postId, likedId.userId];
            console.log(dislike)
            db.query('DELETE FROM likes WHERE postId = ? AND userId = ?', dislike, err => {
                console.log(err)
                if (err) {
                    return reject(err);
                } else{
                    return resolve()
                }
            })

            let insert = [-1, likedId.postId]
            console.log(insert)
            db.query('UPDATE post SET likes = likes + ? WHERE id = ?', insert), (err, res) => {
                if (err) {
                    return reject(err)
                }else{
                    this.id = res;
                    return resolve()
                }
            }
        })
    }

    save(){
        return new Promise((resolve, reject) => {
            let like = [this.userId, this.postId];
            let sql = 'INSERT INTO likes SET userId = ?, postId = ?, likeTime = NOW()';
            db.query(sql, like, err =>{
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
            let insert = [+1, this.postId]
            db.query('UPDATE post SET likes = likes + ? WHERE id = ?', insert, (err, res) => {
                if (err) {
                    return reject(err)
                }else{
                    this.id = res;
                    return resolve()
                }
            })
        })
    }
}

module.exports = Like;