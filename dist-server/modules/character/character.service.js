"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const character_entity_1 = require("../../entities/character.entity");
const character_move_entity_1 = require("../../entities/character-move.entity");
const character_base_stat_entity_1 = require("../../entities/character-base-stat.entity");
let CharacterService = class CharacterService {
    constructor(characterRepo, moveRepo, baseStatRepo) {
        this.characterRepo = characterRepo;
        this.moveRepo = moveRepo;
        this.baseStatRepo = baseStatRepo;
    }
    deleteUploadedFile(relativeUrl) {
        if (!relativeUrl)
            return;
        const filename = relativeUrl.replace(/^\/uploads\//, '');
        const filepath = path.join(__dirname, '../../../../uploads', filename);
        fs.unlink(filepath, (err) => {
            if (err)
                console.warn(`[Warning] Could not delete file: ${filepath}`, err.message);
        });
    }
    async getAllCharacters() {
        return this.characterRepo.find({ order: { name: 'ASC' } });
    }
    async getCharacterById(id) {
        const character = await this.characterRepo.findOne({
            where: { id },
            relations: ['moves', 'base_stats'],
        });
        if (!character)
            throw new common_1.NotFoundException('Character not found.');
        return character;
    }
    async createCharacter(dto, file) {
        const imageUrl = file ? `/uploads/${file.filename}` : null;
        try {
            const newCharacter = this.characterRepo.create({
                name: dto.name,
                debut_date: dto.debut_date || null,
                description: dto.description || null,
                difficulty: dto.difficulty ? Number(dto.difficulty) : 1,
                type: dto.type || null,
                image_url: imageUrl,
            });
            const saved = await this.characterRepo.save(newCharacter);
            return { message: 'Character created successfully.', character: saved };
        }
        catch (error) {
            if (file)
                this.deleteUploadedFile(imageUrl);
            throw error;
        }
    }
    async updateCharacter(id, dto, file) {
        const character = await this.characterRepo.findOne({ where: { id } });
        if (!character) {
            if (file)
                this.deleteUploadedFile(`/uploads/${file.filename}`);
            throw new common_1.NotFoundException('Character not found.');
        }
        let imageUrl = character.image_url;
        if (file) {
            if (character.image_url)
                this.deleteUploadedFile(character.image_url);
            imageUrl = `/uploads/${file.filename}`;
        }
        character.name = dto.name !== undefined ? dto.name : character.name;
        character.debut_date = dto.debut_date !== undefined ? (dto.debut_date || null) : character.debut_date;
        character.description = dto.description !== undefined ? (dto.description || null) : character.description;
        character.difficulty = dto.difficulty !== undefined ? Number(dto.difficulty) : character.difficulty;
        character.type = dto.type !== undefined ? (dto.type || null) : character.type;
        character.image_url = imageUrl;
        const saved = await this.characterRepo.save(character);
        return { message: 'Character updated successfully.', character: saved };
    }
    async deleteCharacter(id) {
        const character = await this.characterRepo.findOne({ where: { id } });
        if (!character)
            throw new common_1.NotFoundException('Character not found.');
        await this.characterRepo.remove(character);
        if (character.image_url)
            this.deleteUploadedFile(character.image_url);
        return { message: 'Character deleted successfully.' };
    }
    async getCharacterMoves(characterId) {
        await this.getCharacterById(characterId);
        return this.moveRepo.find({ where: { character_id: characterId }, order: { id: 'ASC' } });
    }
    async getCharacterBaseStats(characterId) {
        await this.getCharacterById(characterId);
        return this.baseStatRepo.findOne({ where: { character_id: characterId } });
    }
    async createCharacterMove(characterId, dto) {
        await this.getCharacterById(characterId);
        const newMove = this.moveRepo.create({
            character_id: characterId,
            ...dto,
        });
        const saved = await this.moveRepo.save(newMove);
        return { message: 'Character move created successfully.', move: saved };
    }
    async updateCharacterMove(moveId, characterId, dto) {
        const move = await this.moveRepo.findOne({ where: { id: moveId, character_id: characterId } });
        if (!move)
            throw new common_1.NotFoundException('Character move not found.');
        Object.assign(move, dto);
        const saved = await this.moveRepo.save(move);
        return { message: 'Character move updated successfully.', move: saved };
    }
    async deleteCharacterMove(moveId, characterId) {
        const result = await this.moveRepo.delete({ id: moveId, character_id: characterId });
        if (result.affected === 0)
            throw new common_1.NotFoundException('Character move not found.');
        return { message: 'Character move deleted successfully.' };
    }
    async upsertCharacterBaseStats(characterId, dto) {
        await this.getCharacterById(characterId);
        let baseStat = await this.baseStatRepo.findOne({ where: { character_id: characterId } });
        if (!baseStat) {
            baseStat = this.baseStatRepo.create({ character_id: characterId, ...dto });
        }
        else {
            Object.assign(baseStat, dto);
        }
        const saved = await this.baseStatRepo.save(baseStat);
        return { message: 'Character base stats saved successfully.', base_stats: saved };
    }
};
exports.CharacterService = CharacterService;
exports.CharacterService = CharacterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(character_entity_1.Character)),
    __param(1, (0, typeorm_1.InjectRepository)(character_move_entity_1.CharacterMove)),
    __param(2, (0, typeorm_1.InjectRepository)(character_base_stat_entity_1.CharacterBaseStat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CharacterService);
//# sourceMappingURL=character.service.js.map