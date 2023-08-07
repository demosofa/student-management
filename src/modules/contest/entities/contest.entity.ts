import { Question } from '@modules/question/entities/question.entity';
import { User } from '@modules/user/entities/user.entity';
import { Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contest {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToMany(() => User, (user) => user.contest)
	user: User;

	@OneToMany(() => Question, (question) => question.contest)
	question: Question;
}
