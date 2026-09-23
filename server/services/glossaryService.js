const glossaryRepository = require('../repositories/glossaryRepository');
const fs = require('fs');
const path = require('path');

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

/**
 * Helper xóa file trong thư mục uploads
 */
const deleteUploadedFile = (relativeUrl) => {
    if (!relativeUrl) return;
    const filename = relativeUrl.replace(/^\/uploads\//, '');
    const filepath = path.join(__dirname, '../../uploads', filename);
    fs.unlink(filepath, (err) => {
        if (err) {
            console.warn(`[Warning] Could not delete file at ${filepath}:`, err.message);
        } else {
            console.log(`[Info] Successfully deleted unused file: ${filepath}`);
        }
    });
};

/**
 * Lấy danh sách tất cả các thuật ngữ
 */
const getAllGlossaries = async () => {
    return await glossaryRepository.findAllGlossaries();
};

/**
 * Tạo mới một thuật ngữ glossary
 */
const createGlossary = async (data, file) => {
    const { term, definition, level, video_url } = data;

    if (!term || !definition) {
        if (file) deleteUploadedFile(`/uploads/${file.filename}`);
        throw createError('Term and definition are required fields.', 400);
    }

    const glossaryLevel = level === 'advanced' ? 'advanced' : 'basic';
    const image_url = file ? `/uploads/${file.filename}` : null;

    try {
        const existingTerm = await glossaryRepository.findGlossaryByTerm(term);
        if (existingTerm) {
            if (file) deleteUploadedFile(`/uploads/${file.filename}`);
            throw createError(`The glossary term '${term}' already exists.`, 400);
        }

        const result = await glossaryRepository.createGlossary({
            term,
            definition,
            level: glossaryLevel,
            image_url,
            video_url: video_url || null
        });

        return {
            id: result.insertId,
            term,
            definition,
            level: glossaryLevel,
            image_url,
            video_url: video_url || null
        };
    } catch (error) {
        if (file) deleteUploadedFile(`/uploads/${file.filename}`);
        throw error;
    }
};

/**
 * Cập nhật thuật ngữ glossary
 */
const updateGlossary = async (id, data, file) => {
    const { term, definition, level, video_url } = data;

    try {
        const glossary = await glossaryRepository.findGlossaryById(id);
        if (!glossary) {
            if (file) deleteUploadedFile(`/uploads/${file.filename}`);
            throw createError('Glossary term not found.', 404);
        }

        let image_url = glossary.image_url;
        if (file) {
            if (glossary.image_url) {
                deleteUploadedFile(glossary.image_url);
            }
            image_url = `/uploads/${file.filename}`;
        }

        if (term && term !== glossary.term) {
            const existingTerm = await glossaryRepository.findGlossaryByTermExcludeId(term, id);
            if (existingTerm) {
                if (file) deleteUploadedFile(`/uploads/${file.filename}`);
                throw createError(`The term '${term}' is already in use by another glossary entry.`, 400);
            }
        }

        const updatedTerm = term !== undefined ? term : glossary.term;
        const updatedDefinition = definition !== undefined ? definition : glossary.definition;
        const updatedLevel = level !== undefined ? (level === 'advanced' ? 'advanced' : 'basic') : glossary.level;
        const updatedVideoUrl = video_url !== undefined ? (video_url || null) : glossary.video_url;

        await glossaryRepository.updateGlossary(id, {
            term: updatedTerm,
            definition: updatedDefinition,
            level: updatedLevel,
            image_url,
            video_url: updatedVideoUrl
        });

        return {
            id: parseInt(id, 10),
            term: updatedTerm,
            definition: updatedDefinition,
            level: updatedLevel,
            image_url,
            video_url: updatedVideoUrl
        };
    } catch (error) {
        if (file) deleteUploadedFile(`/uploads/${file.filename}`);
        throw error;
    }
};

/**
 * Xóa một thuật ngữ glossary và ảnh liên quan
 */
const deleteGlossary = async (id) => {
    const glossary = await glossaryRepository.findGlossaryById(id);
    if (!glossary) {
        throw createError('Glossary term not found.', 404);
    }

    await glossaryRepository.deleteGlossary(id);

    if (glossary.image_url) {
        deleteUploadedFile(glossary.image_url);
    }
};

module.exports = {
    getAllGlossaries,
    createGlossary,
    updateGlossary,
    deleteGlossary
};
