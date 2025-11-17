import express, { Router } from 'express';
import { getLogs } from '../controllers/logController';

const router: express.Router = Router();

router.get('/', getLogs);

export default router;
