import express from 'express';

const router=express.Router();
import * as adminController from '../api/adminController.js';


//prefix: /admins
router.get('/',adminController.listAdmins);
router.post('/',adminController.createAdmin);
router.put('/:id',adminController.updateAdmin);
router.delete('/:id',adminController.deleteAdmin);

export default router;