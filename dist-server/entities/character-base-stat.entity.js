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
exports.CharacterBaseStat = void 0;
const typeorm_1 = require("typeorm");
const character_entity_1 = require("./character.entity");
let CharacterBaseStat = class CharacterBaseStat {
};
exports.CharacterBaseStat = CharacterBaseStat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CharacterBaseStat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], CharacterBaseStat.prototype, "character_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CharacterBaseStat.prototype, "HP", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CharacterBaseStat.prototype, "WALKSPEED", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CharacterBaseStat.prototype, "JUMP_START_UP", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CharacterBaseStat.prototype, "DASH_START_UP", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], CharacterBaseStat.prototype, "BACKDASH", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], CharacterBaseStat.prototype, "REVERSAL", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => character_entity_1.Character, (character) => character.base_stats, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'character_id' }),
    __metadata("design:type", character_entity_1.Character)
], CharacterBaseStat.prototype, "character", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CharacterBaseStat.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CharacterBaseStat.prototype, "updated_at", void 0);
exports.CharacterBaseStat = CharacterBaseStat = __decorate([
    (0, typeorm_1.Entity)('character_base_stats')
], CharacterBaseStat);
//# sourceMappingURL=character-base-stat.entity.js.map