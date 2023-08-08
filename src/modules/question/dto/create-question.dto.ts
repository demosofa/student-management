import { Answer } from '@modules/answer/entities/answer.entity';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	desc: string;

	@IsNotEmpty()
	point: number;

	@IsEmpty()
	right_answer: string;

	@IsString()
	contestId: string;
}
