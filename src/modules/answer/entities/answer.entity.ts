import { Question } from '@modules/question/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	answer: string;

	@ManyToOne(() => Question, (question) => question.answer)
	question: Question;
}
