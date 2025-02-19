import express from 'express';
import { postJob, getJobs, hireFreelancer, updateJobStatus} from '../controllers/jobController.js';

const router = express.Router();

router.post('/post', postJob);
router.get('/', getJobs);
router.post('/hire', hireFreelancer);
router.put('/update', updateJobStatus);

export default router;
