import express, { Router } from 'express';
import { getHealthStatus } from '../controllers/healthController';

const router: express.Router = Router();

router.get('/', getHealthStatus);

export default router;
