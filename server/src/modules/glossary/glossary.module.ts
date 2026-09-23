import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Glossary } from '../../entities/glossary.entity';
import { GlossaryService } from './glossary.service';
import { GlossaryController } from './glossary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Glossary])],
  controllers: [GlossaryController],
  providers: [GlossaryService],
  exports: [GlossaryService],
})
export class GlossaryModule {}
