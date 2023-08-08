import { Answer } from '@modules/answer/entities/answer.entity';
import { Contest } from '@modules/contest/entities/contest.entity';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	desc: string;

	@Column()
	point: number;

	@Column({ nullable: true })
	right_answer: string;

	@ManyToOne(() => Contest, (contest) => contest.question)
	contest: Contest;

	@OneToMany(() => Answer, (answer) => answer.question)
	answer: Answer[];
}
