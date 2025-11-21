import { Router } from 'express';
import { createTask, getTasks, generateSOP } from '../controllers/taskController';
const router = Router();
router.post('/', createTask);
router.get('/', getTasks);
router.post('/generate-sop', generateSOP);
export default router;
