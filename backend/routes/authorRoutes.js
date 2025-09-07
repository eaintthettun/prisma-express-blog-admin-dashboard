import express from 'express';

const router=express.Router();
import * as authorController from '../controller/authorController.js';
import auth from '../middleware/authMiddleware.js';

//prefix: /authors
router.get('/',auth,authorController.listAuthors);

export default router;