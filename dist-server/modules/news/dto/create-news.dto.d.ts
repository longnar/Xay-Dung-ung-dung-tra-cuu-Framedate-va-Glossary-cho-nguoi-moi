export declare class CreateNewsDto {
    title: string;
    content: string;
    version?: string;
    release_date?: string;
    is_major?: boolean;
}
declare const UpdateNewsDto_base: import("@nestjs/common").Type<Partial<CreateNewsDto>>;
export declare class UpdateNewsDto extends UpdateNewsDto_base {
}
export {};
