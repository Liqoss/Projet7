const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const decode = require('jwt-decode');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User(
            req.body.email,
            hash,
            req.body.firstName,
            req.body.lastName
        );
        user.save()
            .then(() => res.status(201).json({message : 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(400).json({error}))
};

exports.login = (req, res, next) => {
    User.findOne(req.body)
    .then(user => {
        if(!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>{
            if (!valid){
                return res.status(401).json({error: 'Mot de passe incorrect !'});
            } else{
                return res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    {userId: user.id},
                    'SECURE_TO_GROUPOMANIA_KEN',
                    {expiresIn: '24h'}
                    )
                })
            }
        })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.findUser = (req, res, next) => {
    const userId =  decode(req.params.id).userId;
    
    User.findOneById(userId)
    .then((profile) => res.status(200).json(profile))
    .catch((error) => res.status(400).json({error}));
}

exports.delete = (req, res, next) => {
    User.delete(req.body.id)
    .then(() => res.status(200).json({message: "Compte supprimé !"}))
    .catch((error) => res.status(400).json({error}));
}