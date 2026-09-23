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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const typeorm_1 = require("typeorm");
const character_move_entity_1 = require("./character-move.entity");
const character_base_stat_entity_1 = require("./character-base-stat.entity");
let Character = class Character {
};
exports.Character = Character;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Character.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Character.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Character.prototype, "debut_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Character.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Character.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Character.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Character.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => character_move_entity_1.CharacterMove, (move) => move.character, { cascade: true }),
    __metadata("design:type", Array)
], Character.prototype, "moves", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => character_base_stat_entity_1.CharacterBaseStat, (baseStat) => baseStat.character, { cascade: true }),
    __metadata("design:type", character_base_stat_entity_1.CharacterBaseStat)
], Character.prototype, "base_stats", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Character.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Character.prototype, "updated_at", void 0);
exports.Character = Character = __decorate([
    (0, typeorm_1.Entity)('characters')
], Character);
//# sourceMappingURL=character.entity.js.map