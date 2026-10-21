const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { verifyAdmin } = require('../middleware/auth');

// --- Public Endpoints ---
router.get('/news', newsController.getAllPatches);
router.get('/news/:id', newsController.getPatchById);

// --- Admin Endpoints ---
router.post('/admin/news', verifyAdmin, newsController.createPatch);
router.put('/admin/news/:id', verifyAdmin, newsController.updatePatch);
router.delete('/admin/news/:id', verifyAdmin, newsController.deletePatch);

module.exports = router;
