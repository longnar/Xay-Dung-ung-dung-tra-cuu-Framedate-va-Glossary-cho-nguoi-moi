export type GlossaryLevel = 'basic' | 'advanced';
export declare class Glossary {
    id: number;
    term: string;
    definition: string;
    level: GlossaryLevel;
    image_url: string | null;
    video_url: string | null;
    created_at: Date;
    updated_at: Date;
}
