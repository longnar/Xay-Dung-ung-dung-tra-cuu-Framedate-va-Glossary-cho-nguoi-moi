import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type GlossaryLevel = 'basic' | 'advanced';

@Entity('glossaries')
export class Glossary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  term: string;

  @Column({ type: 'text' })
  definition: string;

  @Column({ type: 'enum', enum: ['basic', 'advanced'], default: 'basic' })
  level: GlossaryLevel;

  @Column({ length: 255, nullable: true })
  image_url: string | null;

  @Column({ length: 255, nullable: true })
  video_url: string | null;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
