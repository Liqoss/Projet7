const fs = require('fs')
const { post } = require("../app");
const Post = require("../models/post");
const Like = require('../models/like');

// Création d'un post
exports.createPost = (req, res, next) => {
    let data = JSON.parse(req.body.object)

    const post = new Post ({
        ...data,
        imageUrl : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        comments : 0,
        commentsNumber : 0,
        likes : 0,
        usersLiked : []
    });
    console.log(data)
    console.log(post)
    post.save()
    .then(() => res.status(201).json({message : 'Post créé !'}))
    .catch(error => res.status(400).json({error}));
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
    Post.delete(req.params.id)
    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

// Affichage de tous les posts
exports.findPosts = (req, res, next) => {
    Post.find()
    .then((posts) => {
        const mappedPosts = posts.map((post) => {
          post.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + post.imageUrl;
          return post;
        });
        res.status(200).json(mappedPosts);
      })
    .catch(error => res.status(400).json({error}));
};

// Affichage du post sélectionné par l'utilisateur
exports.findOnePost = (req, res, next) => {
    Post.findOneById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch(error => res.status(400).json({error}))
}

// Ajustement du nombre de commentaire
exports.adjustCommentsNumber = (req, res, next) => {
    Post.adjustCommentsNumber(req.params.id)
    .then(() => res.status(200).json({message : 'Nombre de commentaire ajusté !'}))
    .catch(error => res.status(400).json({error}))
}

// Gestion des likes et des dislikes de chaque post
exports.likePost = (req, res, next) => {
    Like.findOne(req.body)
    .then((response) => {
        if (typeof response == 'undefined'){
            const like = new Like (
            req.body.userId,
            req.body.postId
            );
        like.save()
        .then(() => res.status(200).json({message : 'Post liké !'}))
        .catch(error => res.status(400).json({error}))
        } else{
            Like.delete(response)
                .then(() => res.status(200).json({message : 'Post disliké !'}))
                .catch(error => res.status(500).json({error}))
        }
    })
    .catch(error => {
        return res.status(400).json({error})
    })  
}

// Est-ce que l'utilisateur a liké ce post ?
exports.findLike = (req, res, next) => {
    Like.findOne(req.body)
    .then((response) => {
        if (typeof response == 'undefined'){
            res.status(200).json(1)
        } else{
            res.status(200).json(0)
        }
    })
    .catch(error => res.status(500).json({error}))
}