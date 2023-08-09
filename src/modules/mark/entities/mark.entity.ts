import { Contest } from '@modules/contest/entities/contest.entity';
import { User } from '@modules/user/entities/user.entity';
import { IsNumber } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Mark {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => User, (user) => user.mark)
	student: User;

	@ManyToOne(() => Contest, (contest) => contest.mark)
	contest: Contest;

	@IsNumber()
	@Column('double precision')
	mark: number;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}
