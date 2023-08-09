import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	ManyToMany,
	OneToMany,
} from 'typeorm';
import { Role } from '@modules/role/entities/role.entity';
import { Contest } from '@modules/contest/entities/contest.entity';
import { IsNotEmpty } from 'class-validator';
import { Mark } from '@modules/mark/entities/mark.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@IsNotEmpty()
	@Column({ unique: true })
	username: string;

	@Exclude()
	@Column('text')
	password: string;

	@Column()
	code: string;

	@ManyToOne(() => Role, (role) => role.user)
	role: Role;

	@ManyToMany(() => Contest, (contest) => contest.user)
	contest: Contest[];

	@OneToMany(() => Mark, (mark) => mark.student)
	mark: Mark[];

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}
