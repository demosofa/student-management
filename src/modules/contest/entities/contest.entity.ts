import { Question } from '@modules/question/entities/question.entity';
import { User } from '@modules/user/entities/user.entity';
import { Exclude } from 'class-transformer';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contest extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	contestName: string;

	@Column({ default: true })
	isLoading: boolean;

	@ManyToMany(() => User, (user) => user.contest)
	user: User[];

	@OneToMany(() => Question, (question) => question.contest)
	question: Question[];

	@DeleteDateColumn()
	@Exclude()
	deletedAt: Date;

	@CreateDateColumn()
	@Exclude()
	createdAt: Date;

	@Column({ type: 'timestamp' })
	closedAt: string;
}
