import { Repository } from 'typeorm';
import { Character } from '../../entities/character.entity';
import { CharacterMove } from '../../entities/character-move.entity';
import { CharacterBaseStat } from '../../entities/character-base-stat.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpsertBaseStatsDto } from './dto/create-move.dto';
export declare class CharacterService {
    private characterRepo;
    private moveRepo;
    private baseStatRepo;
    constructor(characterRepo: Repository<Character>, moveRepo: Repository<CharacterMove>, baseStatRepo: Repository<CharacterBaseStat>);
    private deleteUploadedFile;
    getAllCharacters(): Promise<Character[]>;
    getCharacterById(id: number): Promise<Character>;
    createCharacter(dto: CreateCharacterDto, file?: Express.Multer.File): Promise<{
        message: string;
        character: Character;
    }>;
    updateCharacter(id: number, dto: Partial<CreateCharacterDto>, file?: Express.Multer.File): Promise<{
        message: string;
        character: Character;
    }>;
    deleteCharacter(id: number): Promise<{
        message: string;
    }>;
    getCharacterMoves(characterId: number): Promise<CharacterMove[]>;
    getCharacterBaseStats(characterId: number): Promise<CharacterBaseStat | null>;
    createCharacterMove(characterId: number, dto: CreateMoveDto): Promise<{
        message: string;
        move: CharacterMove;
    }>;
    updateCharacterMove(moveId: number, characterId: number, dto: Partial<CreateMoveDto>): Promise<{
        message: string;
        move: CharacterMove;
    }>;
    deleteCharacterMove(moveId: number, characterId: number): Promise<{
        message: string;
    }>;
    upsertCharacterBaseStats(characterId: number, dto: UpsertBaseStatsDto): Promise<{
        message: string;
        base_stats: CharacterBaseStat;
    }>;
}
