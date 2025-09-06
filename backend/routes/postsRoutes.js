import express from 'express';
import * as postController from '../controller/postController.js'; //postController.js likely has multiple named exports.
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// prefix: /posts
router.get('/',auth, postController.listPosts); // list all posts including me and other users
// router.post('/', auth, postController.createPost);
// router.get('/following', auth, postController.getFollowingFeed);
// router.get('/edit/:id', auth, postController.showEditForm); // ui(html links)
// router.post('/edit/:id', auth, postController.updatePost);
// router.post('/delete/:id', auth, postController.deletePost);
// router.get('/search', postController.searchPosts);
// router.get('/:id', postController.showPostDetails);
// router.post('/post/:id/like', auth, postController.likePost); // like, unlike route
// router.post('/:id/toggle-bookmark', auth, postController.bookMarkPost);
// router.delete('/post/:id', auth, postController.deletePost);

export default router;