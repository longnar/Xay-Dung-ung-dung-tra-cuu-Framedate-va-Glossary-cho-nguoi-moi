import { Character } from './character.entity';
export declare class CharacterMove {
    id: number;
    character_id: number;
    CHAR_NAME: string;
    CHAR_MOVE: string;
    DAMAGE: number | null;
    START_UP: number | null;
    ACTIVE: number | null;
    RECOVERY: number | null;
    ADV_ON_BLOCK: number | null;
    ADV_ON_HIT: number | null;
    INVULNERABILITY: string | null;
    character: Character;
    created_at: Date;
    updated_at: Date;
}
