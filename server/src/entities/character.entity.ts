import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { CharacterMove } from './character-move.entity';
import { CharacterBaseStat } from './character-base-stat.entity';

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'date', nullable: true })
  debut_date: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ default: 1 })
  difficulty: number;

  @Column({ length: 100, nullable: true })
  type: string | null;

  @Column({ length: 255, nullable: true })
  image_url: string | null;

  @OneToMany(() => CharacterMove, (move) => move.character, { cascade: true })
  moves: CharacterMove[];

  @OneToOne(() => CharacterBaseStat, (baseStat) => baseStat.character, { cascade: true })
  base_stats: CharacterBaseStat;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
