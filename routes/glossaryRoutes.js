const express = require('express');
const router = express.Router();
const glossaryController = require('../controllers/glossaryController');
const { verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// --- Public Endpoints (Guests) ---

// GET /api/glossaries
router.get('/glossaries', glossaryController.getAllGlossaries);


// --- Protected Endpoints (Admin only) ---

// POST /api/admin/glossaries -> Admin adds a new glossary term (optional image upload in 'image' field)
router.post('/admin/glossaries', verifyAdmin, upload.single('image'), glossaryController.createGlossary);

// PUT /api/admin/glossaries/:id -> Admin updates glossary term (optional image upload in 'image' field)
router.put('/admin/glossaries/:id', verifyAdmin, upload.single('image'), glossaryController.updateGlossary);

// DELETE /api/admin/glossaries/:id -> Admin deletes glossary term
router.delete('/api/admin/glossaries/:id', verifyAdmin, glossaryController.deleteGlossary);

module.exports = router;
