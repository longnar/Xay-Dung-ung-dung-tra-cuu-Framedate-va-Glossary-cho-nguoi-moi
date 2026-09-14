const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const { verifyAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public endpoints
router.get('/characters', characterController.getAllCharacters);
router.get('/characters/:id', characterController.getCharacterById);
router.get('/characters/:id/moves', characterController.getCharacterMoves);
router.get('/characters/:id/base-stats', characterController.getCharacterBaseStats);

// Protected character endpoints
router.post('/admin/characters', verifyAdmin, upload.single('image'), characterController.createCharacter);
router.put('/admin/characters/:id', verifyAdmin, upload.single('image'), characterController.updateCharacter);
router.delete('/admin/characters/:id', verifyAdmin, characterController.deleteCharacter);

// Protected moves and base stats endpoints
router.post('/admin/characters/:id/moves', verifyAdmin, characterController.createCharacterMove);
router.put('/admin/characters/:id/moves/:moveId', verifyAdmin, characterController.updateCharacterMove);
router.delete('/admin/characters/:id/moves/:moveId', verifyAdmin, characterController.deleteCharacterMove);
router.put('/admin/characters/:id/base-stats', verifyAdmin, characterController.upsertCharacterBaseStats);

module.exports = router;
