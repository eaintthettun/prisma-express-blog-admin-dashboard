import express from 'express';
import * as commentController from '../api/commentController.js'; //commentController.js likely has multiple named exports.
import auth from '../middleware/authMiddleware.js';

const router=express.Router();
//prefix: /comments
router.post('/',auth,commentController.processComment); //carry post id hidden
router.post('/:id/toggle-like',auth,commentController.likeComment); //comment id

export default router;