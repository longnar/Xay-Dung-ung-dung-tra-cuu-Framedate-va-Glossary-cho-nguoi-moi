import { Character } from './character.entity';
export declare class CharacterBaseStat {
    id: number;
    character_id: number;
    HP: number | null;
    WALKSPEED: number | null;
    JUMP_START_UP: number | null;
    DASH_START_UP: number | null;
    BACKDASH: number | null;
    REVERSAL: string | null;
    character: Character;
    created_at: Date;
    updated_at: Date;
}
