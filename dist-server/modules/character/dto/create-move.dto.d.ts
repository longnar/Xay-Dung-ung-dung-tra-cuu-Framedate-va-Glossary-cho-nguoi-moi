export declare class CreateMoveDto {
    CHAR_NAME: string;
    CHAR_MOVE: string;
    DAMAGE?: number;
    START_UP?: number;
    ACTIVE?: number;
    RECOVERY?: number;
    ADV_ON_BLOCK?: number;
    ADV_ON_HIT?: number;
    INVULNERABILITY?: string;
}
export declare class UpsertBaseStatsDto {
    HP?: number;
    WALKSPEED?: number;
    JUMP_START_UP?: number;
    DASH_START_UP?: number;
    BACKDASH?: number;
    REVERSAL?: string;
}
