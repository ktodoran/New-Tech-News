const router = require('express').Router();
const { Comment } = require('../../models');
const withAuthorization = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentsData => res.json(dbCommentsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentsData => res.json(dbCommentsData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
});

router.post('/', withAuthorization, (req, res) => {
    if (req.session) {
        Comment.create({
            commentText: req.body.commentText,
            postId: req.body.post_id,
            userId: req.session.user_id,
        })
            .then(dbCommentsData => res.json(dbCommentsData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    }
});

router.put('/:id', withAuthorization, (req, res) => {
    Comment.update({
        commentTExt: req.body.commentText,
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentsData => {
            if (!dbCommentsData) {
                res.status(404).json({ message: 'No comment associated with this id' });
                return;
            }
            res.json(dbCommentsData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuthorization, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentsData => {
            if (!dbCommentsData) {
                res.status(404).json({ message: 'No comment associated with this id' });
                return;
            }
            res.json(dbCommentsData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

module.exports = router;