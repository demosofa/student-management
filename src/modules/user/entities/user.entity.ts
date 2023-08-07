import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	ManyToMany,
} from 'typeorm';
import { Role } from '@modules/role/entities/role.entity';
import { Contest } from '@modules/contest/entities/contest.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	code: string;

	@ManyToOne(() => Role, (role) => role.user)
	role: Role;

	@ManyToMany(() => Contest, (contest) => contest.user)
	contest: Contest;

	@Column()
	username: string;

	@Column('text')
	password: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}
