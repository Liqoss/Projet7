const mysql = require('mysql');
const db = require('../connection');

class User {
    constructor(email, password, firstName, lastName, id) {
        this.id = id
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    static findOne(user) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE email = ?", [user.email], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(new User(result[0].email, result[0].password, result[0].firstName, result[0].lastName, result[0].id));

            }) 
        })
    }
 
    static findOneById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
                if (err){
                    console.log(err)
                    return reject(err)
                }
                resolve(result[0]);
            }) 
        })
    }
    
    static delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM user WHERE id = ?";

            db.query(sql, [id], err => {
                if (err) {
                    return reject(err);
                }
                return resolve()
            })
        }) 
    };

    save() {
        return new Promise((resolve, reject) => {
            let user = [this.email, this.password, this.firstName, this.lastName];
            let sql = "INSERT INTO user SET email = ?, password = ?, firstName = ?, lastName = ?, signinDate = NOW()"
            db.query(sql, user, err => {
                if (err) {
                    return reject(err)
                } else {
                    db.query("SELECT LAST_INSERT_ID()", [], (err, res) => {
                        if (err) {
                            return reject(err)
                        } else {
                            this.id = res;
                            return resolve()
                        }
                    })
                }
            })
        })

    };  
}

module.exports = User;