import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsPatch } from '../../entities/news-patch.entity';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NewsPatch])],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
