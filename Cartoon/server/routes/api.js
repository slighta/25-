import express from 'express';
import { analyzePaperCtrl, generateScriptCtrl, generateComicCtrl, termExplainCtrl } from '../controllers';

const router = express.Router();

router.post('/analyze-paper', analyzePaperCtrl);
router.post('/generate-script', generateScriptCtrl);
router.post('/generate-comic', generateComicCtrl);
router.get('/term-explain', termExplainCtrl);

export default router; 