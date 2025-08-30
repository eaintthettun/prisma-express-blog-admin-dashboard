import express from 'express';
const router=express.Router();
import * as categoryController from '../api/categoryController.js';

// prefix /categories
router.get('/',categoryController.listCategories);
router.post('/',categoryController.createCategory); 

export default router;