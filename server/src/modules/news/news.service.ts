import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsPatch } from '../../entities/news-patch.entity';
import { CreateNewsDto, UpdateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsPatch)
    private newsRepo: Repository<NewsPatch>,
  ) {}

  async getAllPatches(): Promise<NewsPatch[]> {
    return this.newsRepo.find({ order: { release_date: 'DESC', id: 'DESC' } });
  }

  async getPatchById(id: number): Promise<NewsPatch> {
    const patch = await this.newsRepo.findOne({ where: { id } });
    if (!patch) throw new NotFoundException('News patch not found.');
    return patch;
  }

  async createPatch(dto: CreateNewsDto) {
    const newPatch = this.newsRepo.create({
      title: dto.title.trim(),
      version: dto.version?.trim() || 'v5.x',
      release_date: dto.release_date || new Date().toISOString().substring(0, 10),
      content: dto.content,
      is_major: dto.is_major ?? false,
    });
    const saved = await this.newsRepo.save(newPatch);
    return { message: 'News patch created successfully.', patch: saved };
  }

  async updatePatch(id: number, dto: UpdateNewsDto) {
    const patch = await this.getPatchById(id);

    patch.title = dto.title !== undefined ? dto.title.trim() : patch.title;
    patch.version = dto.version !== undefined ? dto.version.trim() || 'v5.x' : patch.version;
    patch.release_date = dto.release_date !== undefined ? dto.release_date : patch.release_date;
    patch.content = dto.content !== undefined ? dto.content : patch.content;
    patch.is_major = dto.is_major !== undefined ? dto.is_major : patch.is_major;

    const saved = await this.newsRepo.save(patch);
    return { message: 'News patch updated successfully.', patch: saved };
  }

  async deletePatch(id: number) {
    const patch = await this.getPatchById(id);
    await this.newsRepo.remove(patch);
    return { message: 'News patch deleted successfully.' };
  }
}
