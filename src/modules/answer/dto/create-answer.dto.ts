import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAnswerDto {
	@IsNotEmpty({ message: 'ko được để rỗng' })
	@Length(5)
	answer: string;

	@IsNotEmpty()
	@IsString()
	questionId: string;
}
