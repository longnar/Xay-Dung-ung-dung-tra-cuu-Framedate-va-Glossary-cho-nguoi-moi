import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Character } from '../../entities/character.entity';
import { CharacterMove } from '../../entities/character-move.entity';
import { CharacterBaseStat } from '../../entities/character-base-stat.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpsertBaseStatsDto } from './dto/create-move.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepo: Repository<Character>,
    @InjectRepository(CharacterMove)
    private moveRepo: Repository<CharacterMove>,
    @InjectRepository(CharacterBaseStat)
    private baseStatRepo: Repository<CharacterBaseStat>,
  ) {}

  private deleteUploadedFile(relativeUrl: string | null) {
    if (!relativeUrl) return;
    const filename = relativeUrl.replace(/^\/uploads\//, '');
    const filepath = path.join(__dirname, '../../../../uploads', filename);
    fs.unlink(filepath, (err) => {
      if (err) console.warn(`[Warning] Could not delete file: ${filepath}`, err.message);
    });
  }

  async getAllCharacters(): Promise<Character[]> {
    return this.characterRepo.find({ order: { name: 'ASC' } });
  }

  async getCharacterById(id: number): Promise<Character> {
    const character = await this.characterRepo.findOne({
      where: { id },
      relations: ['moves', 'base_stats'],
    });
    if (!character) throw new NotFoundException('Character not found.');
    return character;
  }

  async createCharacter(dto: CreateCharacterDto, file?: Express.Multer.File) {
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
    } catch (error) {
      if (file) this.deleteUploadedFile(imageUrl);
      throw error;
    }
  }

  async updateCharacter(id: number, dto: Partial<CreateCharacterDto>, file?: Express.Multer.File) {
    const character = await this.characterRepo.findOne({ where: { id } });
    if (!character) {
      if (file) this.deleteUploadedFile(`/uploads/${file.filename}`);
      throw new NotFoundException('Character not found.');
    }

    let imageUrl = character.image_url;
    if (file) {
      if (character.image_url) this.deleteUploadedFile(character.image_url);
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

  async deleteCharacter(id: number) {
    const character = await this.characterRepo.findOne({ where: { id } });
    if (!character) throw new NotFoundException('Character not found.');

    await this.characterRepo.remove(character);
    if (character.image_url) this.deleteUploadedFile(character.image_url);

    return { message: 'Character deleted successfully.' };
  }

  async getCharacterMoves(characterId: number): Promise<CharacterMove[]> {
    await this.getCharacterById(characterId);
    return this.moveRepo.find({ where: { character_id: characterId }, order: { id: 'ASC' } });
  }

  async getCharacterBaseStats(characterId: number): Promise<CharacterBaseStat | null> {
    await this.getCharacterById(characterId);
    return this.baseStatRepo.findOne({ where: { character_id: characterId } });
  }

  async createCharacterMove(characterId: number, dto: CreateMoveDto) {
    await this.getCharacterById(characterId);
    const newMove = this.moveRepo.create({
      character_id: characterId,
      ...dto,
    });
    const saved = await this.moveRepo.save(newMove);
    return { message: 'Character move created successfully.', move: saved };
  }

  async updateCharacterMove(moveId: number, characterId: number, dto: Partial<CreateMoveDto>) {
    const move = await this.moveRepo.findOne({ where: { id: moveId, character_id: characterId } });
    if (!move) throw new NotFoundException('Character move not found.');

    Object.assign(move, dto);
    const saved = await this.moveRepo.save(move);
    return { message: 'Character move updated successfully.', move: saved };
  }

  async deleteCharacterMove(moveId: number, characterId: number) {
    const result = await this.moveRepo.delete({ id: moveId, character_id: characterId });
    if (result.affected === 0) throw new NotFoundException('Character move not found.');
    return { message: 'Character move deleted successfully.' };
  }

  async upsertCharacterBaseStats(characterId: number, dto: UpsertBaseStatsDto) {
    await this.getCharacterById(characterId);
    let baseStat = await this.baseStatRepo.findOne({ where: { character_id: characterId } });
    if (!baseStat) {
      baseStat = this.baseStatRepo.create({ character_id: characterId, ...dto });
    } else {
      Object.assign(baseStat, dto);
    }
    const saved = await this.baseStatRepo.save(baseStat);
    return { message: 'Character base stats saved successfully.', base_stats: saved };
  }
}
