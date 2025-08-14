import express from 'express';
import * as authController from '../api/authController.js'; //authController.js likely has multiple named exports.
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router=express.Router();
//prefix: /auth
router.get('/register',authController.showRegister); //get method 
router.post('/register',authController.register); //post method
router.get('/login',authController.showLogin);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.get('/profile/:id',authController.showProfile); 
router.post('/toggle-follow',auth,authController.toggleFollow); //do not show id of profile user
router.get('/profile/edit/:id',authController.showEditProfile);

//upload.single('file input name) will populate req.file if a file is uploaded.
router.post('/profile/edit/:id',upload.single('profilePicture'),authController.editProfile);

export default router;