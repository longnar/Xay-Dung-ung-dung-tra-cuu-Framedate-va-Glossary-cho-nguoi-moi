const newsService = require('../server/services/newsService');

const getAllPatches = async (req, res) => {
    try {
        const patches = await newsService.getAllPatches();
        return res.status(200).json(patches);
    } catch (error) {
        console.error('Error in getAllPatches:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Loi khi lay danh sach ban cap nhat.'
        });
    }
};

const getPatchById = async (req, res) => {
    try {
        const patch = await newsService.getPatchById(req.params.id);
        return res.status(200).json(patch);
    } catch (error) {
        console.error('Error in getPatchById:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Loi khi lay chi tiet ban cap nhat.'
        });
    }
};

const createPatch = async (req, res) => {
    try {
        const patch = await newsService.createPatch(req.body);
        return res.status(201).json({
            message: 'Tao ban cap nhat thanh cong.',
            patch
        });
    } catch (error) {
        console.error('Error in createPatch:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Loi khi tao ban cap nhat.'
        });
    }
};

const updatePatch = async (req, res) => {
    try {
        const patch = await newsService.updatePatch(req.params.id, req.body);
        return res.status(200).json({
            message: 'Cap nhat ban cap nhat thanh cong.',
            patch
        });
    } catch (error) {
        console.error('Error in updatePatch:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Loi khi cap nhat ban cap nhat.'
        });
    }
};

const deletePatch = async (req, res) => {
    try {
        await newsService.deletePatch(req.params.id);
        return res.status(200).json({ message: 'Xoa ban cap nhat thanh cong.' });
    } catch (error) {
        console.error('Error in deletePatch:', error);
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Loi khi xoa ban cap nhat.'
        });
    }
};

module.exports = {
    getAllPatches,
    getPatchById,
    createPatch,
    updatePatch,
    deletePatch
};
