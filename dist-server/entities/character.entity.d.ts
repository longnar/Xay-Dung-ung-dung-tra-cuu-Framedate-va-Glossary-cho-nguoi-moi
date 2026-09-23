import { CharacterMove } from './character-move.entity';
import { CharacterBaseStat } from './character-base-stat.entity';
export declare class Character {
    id: number;
    name: string;
    debut_date: string | null;
    description: string | null;
    difficulty: number;
    type: string | null;
    image_url: string | null;
    moves: CharacterMove[];
    base_stats: CharacterBaseStat;
    created_at: Date;
    updated_at: Date;
}
