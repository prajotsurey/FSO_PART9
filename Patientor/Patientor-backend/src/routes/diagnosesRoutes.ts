import diagnoseService from '../services/diagnoseService';
import express from 'express';

const router = express.Router();

router.get('/', (_req,res) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;