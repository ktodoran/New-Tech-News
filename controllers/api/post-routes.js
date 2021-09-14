const sequelize = require('../../config/connection');
const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');


router.get('/', (res, req) => {
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post_id = vote.post_id)'), 'vote_Count']],
        order: [['created_at', 'ASC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'Comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
            model: User,
            attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/', (res, req) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post_id = vote.post_id)'), 'vote_count']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'Comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'User Not Found'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/voteUp', (req, res) => {
    Post.voteUp(req.body, { Vote })
        .then(updatePostData => res.json(updatePostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});


router.put('/:id', (req, res) => {
    Post.updatePostData(
        {
            title: req.params.title
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: 'User Not Found'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'User Not Found'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;