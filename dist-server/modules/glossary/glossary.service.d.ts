import { Repository } from 'typeorm';
import { Glossary } from '../../entities/glossary.entity';
import { CreateGlossaryDto } from './dto/create-glossary.dto';
export declare class GlossaryService {
    private glossaryRepo;
    constructor(glossaryRepo: Repository<Glossary>);
    private deleteUploadedFile;
    getAllGlossaries(): Promise<Glossary[]>;
    createGlossary(dto: CreateGlossaryDto, file?: Express.Multer.File): Promise<{
        message: string;
        glossary: Glossary;
    }>;
    updateGlossary(id: number, dto: Partial<CreateGlossaryDto>, file?: Express.Multer.File): Promise<{
        message: string;
        glossary: Glossary;
    }>;
    deleteGlossary(id: number): Promise<{
        message: string;
    }>;
}
