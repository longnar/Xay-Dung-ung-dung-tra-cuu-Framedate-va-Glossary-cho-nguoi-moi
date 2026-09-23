const characterService = require('../server/services/characterService');

const getAllCharacters = async (req, res) => {
    try {
        const characters = await characterService.getAllCharacters();
        return res.status(200).json(characters);
    } catch (error) {
        console.error('Error in getAllCharacters:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to retrieve characters list.'
        });
    }
};

const getCharacterById = async (req, res) => {
    try {
        const character = await characterService.getCharacterById(req.params.id);
        return res.status(200).json(character);
    } catch (error) {
        console.error('Error in getCharacterById:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to retrieve character details.'
        });
    }
};

const createCharacter = async (req, res) => {
    try {
        const character = await characterService.createCharacter(req.body, req.file);
        return res.status(201).json({
            message: 'Character created successfully.',
            character
        });
    } catch (error) {
        console.error('Error in createCharacter:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to create character.'
        });
    }
};

const updateCharacter = async (req, res) => {
    try {
        const character = await characterService.updateCharacter(req.params.id, req.body, req.file);
        return res.status(200).json({
            message: 'Character updated successfully.',
            character
        });
    } catch (error) {
        console.error('Error in updateCharacter:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to update character.'
        });
    }
};

const deleteCharacter = async (req, res) => {
    try {
        await characterService.deleteCharacter(req.params.id);
        return res.status(200).json({ message: 'Character deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteCharacter:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to delete character.'
        });
    }
};

const getCharacterMoves = async (req, res) => {
    try {
        const moves = await characterService.getCharacterMoves(req.params.id);
        return res.status(200).json(moves);
    } catch (error) {
        console.error('Error in getCharacterMoves:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to retrieve character moves.'
        });
    }
};

const getCharacterBaseStats = async (req, res) => {
    try {
        const baseStats = await characterService.getCharacterBaseStats(req.params.id);
        return res.status(200).json(baseStats);
    } catch (error) {
        console.error('Error in getCharacterBaseStats:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to retrieve character base stats.'
        });
    }
};

const createCharacterMove = async (req, res) => {
    try {
        const move = await characterService.createCharacterMove(req.params.id, req.body);
        return res.status(201).json({
            message: 'Character move created successfully.',
            move
        });
    } catch (error) {
        console.error('Error in createCharacterMove:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to create character move.'
        });
    }
};

const updateCharacterMove = async (req, res) => {
    try {
        const move = await characterService.updateCharacterMove(req.params.moveId, req.params.id, req.body);
        return res.status(200).json({
            message: 'Character move updated successfully.',
            move
        });
    } catch (error) {
        console.error('Error in updateCharacterMove:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to update character move.'
        });
    }
};

const deleteCharacterMove = async (req, res) => {
    try {
        await characterService.deleteCharacterMove(req.params.moveId, req.params.id);
        return res.status(200).json({ message: 'Character move deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteCharacterMove:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to delete character move.'
        });
    }
};

const upsertCharacterBaseStats = async (req, res) => {
    try {
        const baseStats = await characterService.upsertCharacterBaseStats(req.params.id, req.body);
        return res.status(200).json({
            message: 'Character base stats saved successfully.',
            base_stats: baseStats
        });
    } catch (error) {
        console.error('Error in upsertCharacterBaseStats:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to save character base stats.'
        });
    }
};

module.exports = {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacterMoves,
    getCharacterBaseStats,
    createCharacterMove,
    updateCharacterMove,
    deleteCharacterMove,
    upsertCharacterBaseStats
};
