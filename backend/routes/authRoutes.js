import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import * as authController from '../controller/authController.js';

const router=express.Router();
//prefix: /auth
router.post('/register',authController.register); //post method
router.post('/login',authController.login);
router.get('/profile/:id',authController.showProfile); 
router.post('/toggle-follow',authController.toggleFollow); //do not show id of profile user
router.get('/profile/edit/:id',authController.showEditProfile);

//upload.single('file input name) will populate req.file if a file is uploaded.
router.post('/profile/edit/:id',upload.single('profilePicture'),authController.editProfile);

export default router;