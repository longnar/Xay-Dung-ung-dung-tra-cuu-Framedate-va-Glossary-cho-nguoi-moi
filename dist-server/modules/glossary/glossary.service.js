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
exports.GlossaryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const glossary_entity_1 = require("../../entities/glossary.entity");
let GlossaryService = class GlossaryService {
    constructor(glossaryRepo) {
        this.glossaryRepo = glossaryRepo;
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
    async getAllGlossaries() {
        return this.glossaryRepo.find({ order: { term: 'ASC' } });
    }
    async createGlossary(dto, file) {
        const { term, definition, level, video_url } = dto;
        const glossaryLevel = level === 'advanced' ? 'advanced' : 'basic';
        const imageUrl = file ? `/uploads/${file.filename}` : null;
        try {
            const existing = await this.glossaryRepo.findOne({ where: { term } });
            if (existing) {
                if (file)
                    this.deleteUploadedFile(imageUrl);
                throw new common_1.BadRequestException(`The glossary term '${term}' already exists.`);
            }
            const newGlossary = this.glossaryRepo.create({
                term,
                definition,
                level: glossaryLevel,
                image_url: imageUrl,
                video_url: video_url || null,
            });
            const saved = await this.glossaryRepo.save(newGlossary);
            return { message: 'Glossary term created successfully.', glossary: saved };
        }
        catch (error) {
            if (file)
                this.deleteUploadedFile(imageUrl);
            throw error;
        }
    }
    async updateGlossary(id, dto, file) {
        const glossary = await this.glossaryRepo.findOne({ where: { id } });
        if (!glossary) {
            if (file)
                this.deleteUploadedFile(`/uploads/${file.filename}`);
            throw new common_1.NotFoundException('Glossary term not found.');
        }
        let imageUrl = glossary.image_url;
        if (file) {
            if (glossary.image_url)
                this.deleteUploadedFile(glossary.image_url);
            imageUrl = `/uploads/${file.filename}`;
        }
        if (dto.term && dto.term !== glossary.term) {
            const existing = await this.glossaryRepo.findOne({ where: { term: dto.term, id: (0, typeorm_2.Not)(id) } });
            if (existing) {
                if (file)
                    this.deleteUploadedFile(imageUrl);
                throw new common_1.BadRequestException(`The term '${dto.term}' is already in use.`);
            }
        }
        glossary.term = dto.term !== undefined ? dto.term : glossary.term;
        glossary.definition = dto.definition !== undefined ? dto.definition : glossary.definition;
        glossary.level = dto.level !== undefined ? (dto.level === 'advanced' ? 'advanced' : 'basic') : glossary.level;
        glossary.image_url = imageUrl;
        glossary.video_url = dto.video_url !== undefined ? (dto.video_url || null) : glossary.video_url;
        const saved = await this.glossaryRepo.save(glossary);
        return { message: 'Glossary term updated successfully.', glossary: saved };
    }
    async deleteGlossary(id) {
        const glossary = await this.glossaryRepo.findOne({ where: { id } });
        if (!glossary)
            throw new common_1.NotFoundException('Glossary term not found.');
        await this.glossaryRepo.remove(glossary);
        if (glossary.image_url)
            this.deleteUploadedFile(glossary.image_url);
        return { message: 'Glossary term deleted successfully.' };
    }
};
exports.GlossaryService = GlossaryService;
exports.GlossaryService = GlossaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(glossary_entity_1.Glossary)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GlossaryService);
//# sourceMappingURL=glossary.service.js.map