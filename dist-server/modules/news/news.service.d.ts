import { Repository } from 'typeorm';
import { NewsPatch } from '../../entities/news-patch.entity';
import { CreateNewsDto, UpdateNewsDto } from './dto/create-news.dto';
export declare class NewsService {
    private newsRepo;
    constructor(newsRepo: Repository<NewsPatch>);
    getAllPatches(): Promise<NewsPatch[]>;
    getPatchById(id: number): Promise<NewsPatch>;
    createPatch(dto: CreateNewsDto): Promise<{
        message: string;
        patch: NewsPatch;
    }>;
    updatePatch(id: number, dto: UpdateNewsDto): Promise<{
        message: string;
        patch: NewsPatch;
    }>;
    deletePatch(id: number): Promise<{
        message: string;
    }>;
}
