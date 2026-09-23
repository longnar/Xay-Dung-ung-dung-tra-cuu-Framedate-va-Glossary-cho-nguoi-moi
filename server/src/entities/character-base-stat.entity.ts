import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Character } from './character.entity';

@Entity('character_base_stats')
export class CharacterBaseStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  character_id: number;

  @Column({ type: 'int', nullable: true })
  HP: number | null;

  @Column({ type: 'int', nullable: true })
  WALKSPEED: number | null;

  @Column({ type: 'int', nullable: true })
  JUMP_START_UP: number | null;

  @Column({ type: 'int', nullable: true })
  DASH_START_UP: number | null;

  @Column({ type: 'int', nullable: true })
  BACKDASH: number | null;

  @Column({ length: 255, nullable: true })
  REVERSAL: string | null;

  @OneToOne(() => Character, (character) => character.base_stats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
