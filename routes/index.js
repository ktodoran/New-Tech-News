const usersRoutes = require('./API/user-routes');
const postsRoutes = require('./API/post-routes');
const commentsRoutes = require('./API/comment-routes');

const router = require('express').Router();

router.use('/User', usersRoutes);
router.use('/Post', postsRoutes);
router.use('/Comment', commentsRoutes);


router.get('/', (req, res) => {
    res.send("Hello World!")
});

router.use((res, req) => {
    res.status(404).end();
});

module.exports = router;