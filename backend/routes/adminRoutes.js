import express from 'express';

const router=express.Router();
import * as adminController from '../controller/adminController.js';
import auth from '../middleware/authMiddleware.js';

//prefix: /admins
router.get('/',auth,adminController.listAdmins);
router.post('/',auth,adminController.createAdmin);
router.put('/:id',auth,adminController.updateAdmin);
router.delete('/:id',auth,adminController.deleteAdmin);

export default router;