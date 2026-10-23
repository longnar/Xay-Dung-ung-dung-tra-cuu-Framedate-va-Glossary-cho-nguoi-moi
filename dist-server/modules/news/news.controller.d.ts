import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/create-news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getAllPatches(): Promise<import("../../entities/news-patch.entity").NewsPatch[]>;
    getPatchById(id: number): Promise<import("../../entities/news-patch.entity").NewsPatch>;
    createPatch(dto: CreateNewsDto): Promise<{
        message: string;
        patch: import("../../entities/news-patch.entity").NewsPatch;
    }>;
    updatePatch(id: number, dto: UpdateNewsDto): Promise<{
        message: string;
        patch: import("../../entities/news-patch.entity").NewsPatch;
    }>;
    deletePatch(id: number): Promise<{
        message: string;
    }>;
}
