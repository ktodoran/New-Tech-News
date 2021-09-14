const router = require('express').Router();
const { Comment } = require('../../models');


router.get('/', (req, res) => {
    res.send(null)
});

router.post('/', (req, res) => {
    Comment.create({
        Comment_text: req.body.Comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    res.send(null)
});

module.exports = router;