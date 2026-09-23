const characterRepository = require('../repositories/characterRepository');
const fs = require('fs');
const path = require('path');

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

/**
 * Xóa file trong thư mục uploads khi không còn sử dụng
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

const numericMoveFields = ['DAMAGE', 'START_UP', 'ACTIVE', 'RECOVERY', 'ADV_ON_BLOCK', 'ADV_ON_HIT'];
const numericBaseStatFields = ['HP', 'WALKSPEED', 'JUMP_START_UP', 'DASH_START_UP', 'BACKDASH'];

const parseOptionalInteger = (value, fieldName) => {
    if (value === undefined || value === null || value === '') return null;
    const parsed = Number(value);
    if (!Number.isInteger(parsed)) {
        throw createError(`${fieldName} must be an integer.`, 400);
    }
    return parsed;
};

const ensureCharacterExists = async (characterId) => {
    const character = await characterRepository.findCharacterById(characterId);
    if (!character) {
        throw createError('Character not found.', 404);
    }
    return character;
};

/**
 * Lấy danh sách tất cả các nhân vật
 */
const getAllCharacters = async () => {
    return await characterRepository.findAllCharacters();
};

/**
 * Lấy chi tiết một nhân vật kèm Moves và Base Stats
 */
const getCharacterById = async (id) => {
    const character = await ensureCharacterExists(id);
    const [moves, baseStats] = await Promise.all([
        characterRepository.findMovesByCharacterId(id),
        characterRepository.findBaseStatsByCharacterId(id)
    ]);
    return {
        ...character,
        moves,
        base_stats: baseStats || null
    };
};

/**
 * Tạo nhân vật mới (hỗ trợ upload ảnh)
 */
const createCharacter = async (data, file) => {
    const { name, debut_date, description, difficulty, type } = data;

    if (!name) {
        if (file) deleteUploadedFile(`/uploads/${file.filename}`);
        throw createError('Character name is required.', 400);
    }

    const image_url = file ? `/uploads/${file.filename}` : null;

    try {
        const result = await characterRepository.createCharacter({
            name,
            debut_date: debut_date || null,
            description: description || null,
            difficulty: difficulty ? parseInt(difficulty, 10) : 1,
            type: type || null,
            image_url
        });

        return {
            id: result.insertId,
            name,
            debut_date: debut_date || null,
            description: description || null,
            difficulty: difficulty ? parseInt(difficulty, 10) : 1,
            type: type || null,
            image_url
        };
    } catch (error) {
        if (file) deleteUploadedFile(`/uploads/${file.filename}`);
        throw error;
    }
};

/**
 * Cập nhật thông tin nhân vật
 */
const updateCharacter = async (id, data, file) => {
    const { name, debut_date, description, difficulty, type } = data;

    try {
        const character = await characterRepository.findCharacterById(id);
        if (!character) {
            if (file) deleteUploadedFile(`/uploads/${file.filename}`);
            throw createError('Character not found.', 404);
        }

        let image_url = character.image_url;
        if (file) {
            if (character.image_url) {
                deleteUploadedFile(character.image_url);
            }
            image_url = `/uploads/${file.filename}`;
        }

        const updatedName = name !== undefined ? name : character.name;
        const updatedDebut = debut_date !== undefined ? (debut_date || null) : character.debut_date;
        const updatedDesc = description !== undefined ? (description || null) : character.description;
        const updatedDiff = difficulty !== undefined ? parseInt(difficulty, 10) : character.difficulty;
        const updatedType = type !== undefined ? (type || null) : character.type;

        await characterRepository.updateCharacter(id, {
            name: updatedName,
            debut_date: updatedDebut,
            description: updatedDesc,
            difficulty: updatedDiff,
            type: updatedType,
            image_url
        });

        return {
            id: parseInt(id, 10),
            name: updatedName,
            debut_date: updatedDebut,
            description: updatedDesc,
            difficulty: updatedDiff,
            type: updatedType,
            image_url
        };
    } catch (error) {
        if (file) deleteUploadedFile(`/uploads/${file.filename}`);
        throw error;
    }
};

/**
 * Xóa một nhân vật và ảnh liên quan
 */
const deleteCharacter = async (id) => {
    const character = await characterRepository.findCharacterById(id);
    if (!character) {
        throw createError('Character not found.', 404);
    }

    await characterRepository.deleteCharacter(id);

    if (character.image_url) {
        deleteUploadedFile(character.image_url);
    }
};

/**
 * Lấy danh sách moves của nhân vật
 */
const getCharacterMoves = async (characterId) => {
    await ensureCharacterExists(characterId);
    return await characterRepository.findMovesByCharacterId(characterId);
};

/**
 * Lấy chỉ số cơ bản của nhân vật
 */
const getCharacterBaseStats = async (characterId) => {
    await ensureCharacterExists(characterId);
    return await characterRepository.findBaseStatsByCharacterId(characterId);
};

/**
 * Thêm Move cho nhân vật
 */
const createCharacterMove = async (characterId, data) => {
    const { CHAR_NAME, CHAR_MOVE, INVULNERABILITY } = data;
    if (!CHAR_NAME || !CHAR_MOVE) {
        throw createError('CHAR_NAME and CHAR_MOVE are required.', 400);
    }

    await ensureCharacterExists(characterId);

    const movePayload = {
        CHAR_NAME,
        CHAR_MOVE,
        INVULNERABILITY: INVULNERABILITY || null
    };

    numericMoveFields.forEach((field) => {
        movePayload[field] = parseOptionalInteger(data[field], field);
    });

    return await characterRepository.createMove(characterId, movePayload);
};

/**
 * Cập nhật Move của nhân vật
 */
const updateCharacterMove = async (moveId, characterId, data) => {
    const currentMove = await characterRepository.findMoveByIdAndCharacterId(moveId, characterId);
    if (!currentMove) {
        throw createError('Character move not found.', 404);
    }

    const movePayload = {
        CHAR_NAME: data.CHAR_NAME ?? currentMove.CHAR_NAME,
        CHAR_MOVE: data.CHAR_MOVE ?? currentMove.CHAR_MOVE,
        INVULNERABILITY: data.INVULNERABILITY ?? currentMove.INVULNERABILITY
    };

    numericMoveFields.forEach((field) => {
        movePayload[field] = data[field] === undefined ? currentMove[field] : parseOptionalInteger(data[field], field);
    });

    return await characterRepository.updateMove(moveId, characterId, movePayload);
};

/**
 * Xóa Move của nhân vật
 */
const deleteCharacterMove = async (moveId, characterId) => {
    const isDeleted = await characterRepository.deleteMove(moveId, characterId);
    if (!isDeleted) {
        throw createError('Character move not found.', 404);
    }
};

/**
 * Thêm/Cập nhật chỉ số cơ bản cho nhân vật
 */
const upsertCharacterBaseStats = async (characterId, data) => {
    await ensureCharacterExists(characterId);

    const statsPayload = {
        REVERSAL: data.REVERSAL || null
    };

    numericBaseStatFields.forEach((field) => {
        statsPayload[field] = parseOptionalInteger(data[field], field);
    });

    return await characterRepository.upsertBaseStats(characterId, statsPayload);
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
