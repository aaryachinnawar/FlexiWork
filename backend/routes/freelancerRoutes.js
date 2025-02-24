import express from 'express'
import { getFreelancers } from '../controllers/freelancerController.js';

const router = express.Router();

router.get('/',getFreelancers)

export default router;