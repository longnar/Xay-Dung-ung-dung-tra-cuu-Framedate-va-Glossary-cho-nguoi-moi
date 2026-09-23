import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Character } from './character.entity';

@Entity('character_moves')
export class CharacterMove {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  character_id: number;

  @Column({ length: 100 })
  CHAR_NAME: string;

  @Column({ length: 150 })
  CHAR_MOVE: string;

  @Column({ type: 'int', nullable: true })
  DAMAGE: number | null;

  @Column({ type: 'int', nullable: true })
  START_UP: number | null;

  @Column({ type: 'int', nullable: true })
  ACTIVE: number | null;

  @Column({ type: 'int', nullable: true })
  RECOVERY: number | null;

  @Column({ type: 'int', nullable: true })
  ADV_ON_BLOCK: number | null;

  @Column({ type: 'int', nullable: true })
  ADV_ON_HIT: number | null;

  @Column({ length: 255, nullable: true })
  INVULNERABILITY: string | null;

  @ManyToOne(() => Character, (character) => character.moves, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
