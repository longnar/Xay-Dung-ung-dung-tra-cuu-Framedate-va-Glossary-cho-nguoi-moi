"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const news_patch_entity_1 = require("../../entities/news-patch.entity");
let NewsService = class NewsService {
    constructor(newsRepo) {
        this.newsRepo = newsRepo;
    }
    async getAllPatches() {
        return this.newsRepo.find({ order: { release_date: 'DESC', id: 'DESC' } });
    }
    async getPatchById(id) {
        const patch = await this.newsRepo.findOne({ where: { id } });
        if (!patch)
            throw new common_1.NotFoundException('News patch not found.');
        return patch;
    }
    async createPatch(dto) {
        const newPatch = this.newsRepo.create({
            title: dto.title.trim(),
            version: dto.version?.trim() || 'v5.x',
            release_date: dto.release_date || new Date().toISOString().substring(0, 10),
            content: dto.content,
            is_major: dto.is_major ?? false,
        });
        const saved = await this.newsRepo.save(newPatch);
        return { message: 'News patch created successfully.', patch: saved };
    }
    async updatePatch(id, dto) {
        const patch = await this.getPatchById(id);
        patch.title = dto.title !== undefined ? dto.title.trim() : patch.title;
        patch.version = dto.version !== undefined ? dto.version.trim() || 'v5.x' : patch.version;
        patch.release_date = dto.release_date !== undefined ? dto.release_date : patch.release_date;
        patch.content = dto.content !== undefined ? dto.content : patch.content;
        patch.is_major = dto.is_major !== undefined ? dto.is_major : patch.is_major;
        const saved = await this.newsRepo.save(patch);
        return { message: 'News patch updated successfully.', patch: saved };
    }
    async deletePatch(id) {
        const patch = await this.getPatchById(id);
        await this.newsRepo.remove(patch);
        return { message: 'News patch deleted successfully.' };
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(news_patch_entity_1.NewsPatch)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NewsService);
//# sourceMappingURL=news.service.js.map