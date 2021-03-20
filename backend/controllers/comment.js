const Comment = require('../models/comment');

exports.createComment = (req, res, next) => {

    const comment = new Comment (
        req.body.author,
        req.body.comment,
        req.body.postId,
        req.body.userId
    );
    comment.save()
    .then(() => res.status(201).json({message : 'Commentaire créé !'}))
    .catch(error => res.status(400).json({error}));
};

exports.findComments = (req, res, next) => {
    Comment.find(req.params.id)
    .then((comments) => {
        const mappedComments = comments.map((comment) => {
          return comment;
        });
        res.status(200).json(mappedComments);
      })
    .catch(error => res.status(400).json({error}));
}

exports.deleteComment = (req, res, next) => {
    Comment.delete(req.params.id)
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}