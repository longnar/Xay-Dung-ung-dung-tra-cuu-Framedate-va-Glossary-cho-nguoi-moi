const newsRepository = require('../repositories/newsRepository');

const getAllPatches = async () => {
    return await newsRepository.findAllPatches();
};

const getPatchById = async (id) => {
    const patch = await newsRepository.findPatchById(id);
    if (!patch) {
        const error = new Error('Khong tim thay ban cap nhat.');
        error.statusCode = 404;
        throw error;
    }
    return patch;
};

const createPatch = async (data) => {
    if (!data.title || !data.content) {
        const error = new Error('Tieu de va noi dung ban cap nhat la bat buoc.');
        error.statusCode = 400;
        throw error;
    }

    const created = await newsRepository.createPatch({
        title: data.title.trim(),
        version: data.version ? data.version.trim() : 'v5.x',
        release_date: data.release_date || new Date().toISOString().substring(0, 10),
        content: data.content,
        is_major: data.is_major || false
    });

    return await newsRepository.findPatchById(created.insertId);
};

const updatePatch = async (id, data) => {
    const existing = await newsRepository.findPatchById(id);
    if (!existing) {
        const error = new Error('Khong tim thay ban cap nhat de cap nhat.');
        error.statusCode = 404;
        throw error;
    }

    await newsRepository.updatePatch(id, {
        title: data.title !== undefined ? data.title.trim() : existing.title,
        version: data.version !== undefined ? data.version.trim() : existing.version,
        release_date: data.release_date !== undefined ? data.release_date : existing.release_date,
        content: data.content !== undefined ? data.content : existing.content,
        is_major: data.is_major !== undefined ? data.is_major : existing.is_major
    });

    return await newsRepository.findPatchById(id);
};

const deletePatch = async (id) => {
    const existing = await newsRepository.findPatchById(id);
    if (!existing) {
        const error = new Error('Khong tim thay ban cap nhat de xoa.');
        error.statusCode = 404;
        throw error;
    }

    await newsRepository.deletePatch(id);
    return true;
};

module.exports = {
    getAllPatches,
    getPatchById,
    createPatch,
    updatePatch,
    deletePatch
};
