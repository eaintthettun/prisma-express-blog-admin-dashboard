import express from 'express';
const router=express.Router();
import * as categoryController from '../controller/categoryController.js';
import auth from '../middleware/authMiddleware.js';

// prefix /categories
router.get('/',auth,categoryController.listCategories);
router.post('/',auth,categoryController.createCategory); 

export default router;