import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('news_patches')
export class NewsPatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 50 })
  version: string;

  @Column({ type: 'date' })
  release_date: string;

  @Column({ type: 'mediumtext' })
  content: string;

  @Column({ type: 'boolean', default: false })
  is_major: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
