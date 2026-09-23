const glossaryService = require('../server/services/glossaryService');

const getAllGlossaries = async (req, res) => {
    try {
        const glossaries = await glossaryService.getAllGlossaries();
        return res.status(200).json(glossaries);
    } catch (error) {
        console.error('Error in getAllGlossaries:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to retrieve glossary list.'
        });
    }
};

const createGlossary = async (req, res) => {
    try {
        const glossary = await glossaryService.createGlossary(req.body, req.file);
        return res.status(201).json({
            message: 'Glossary term created successfully.',
            glossary
        });
    } catch (error) {
        console.error('Error in createGlossary:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to create glossary term.'
        });
    }
};

const updateGlossary = async (req, res) => {
    try {
        const glossary = await glossaryService.updateGlossary(req.params.id, req.body, req.file);
        return res.status(200).json({
            message: 'Glossary term updated successfully.',
            glossary
        });
    } catch (error) {
        console.error('Error in updateGlossary:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to update glossary term.'
        });
    }
};

const deleteGlossary = async (req, res) => {
    try {
        await glossaryService.deleteGlossary(req.params.id);
        return res.status(200).json({ message: 'Glossary term deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteGlossary:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Failed to delete glossary term.'
        });
    }
};

module.exports = {
    getAllGlossaries,
    createGlossary,
    updateGlossary,
    deleteGlossary
};
