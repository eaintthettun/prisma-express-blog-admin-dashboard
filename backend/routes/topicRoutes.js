import express from 'express';
import * as topicController from '../controller/topicController.js'; //topicController.js likely has multiple named exports.
import auth from '../middleware/authMiddleware.js';


const router=express.Router();
//this controller accepts both categories and topics
//prefix: /topics
router.get('/',topicController.listTopics); //list all categories and topics
router.get('/search',topicController.searchTopic); //carry search word in req.query
router.get('/:slug',topicController.showTopic); //show topic with no. of followers and related stories
router.post('/:topicId/toggle-follow',auth,topicController.toggleFollow);
router.get('/:slug/stories',topicController.showMoreRelatedStories); //you can't use /:id here 
router.get('/:id',topicController.showEditCategory);
router.post('/:id',topicController.editCategory);

export default router;