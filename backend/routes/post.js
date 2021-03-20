const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Affichage de tous les posts
router.get('/', auth, postCtrl.findPosts);

// Affichage du post sélectionné par l'utilisateur
router.get('/:id', auth, postCtrl.findOnePost);

// Création et publication d'un post
router.post('/', auth, multer, postCtrl.createPost);

// Ajustement du nombre de commentaire du post
router.put('/:id', auth, postCtrl.adjustCommentsNumber);

// Suppression d'un post
router.delete('/:id', auth, postCtrl.deletePost);

// Gestion des likes et des dislikes des posts
router.post('/like', auth, postCtrl.likePost);
router.post('/hasLiked', auth, postCtrl.findLike);

module.exports = router;