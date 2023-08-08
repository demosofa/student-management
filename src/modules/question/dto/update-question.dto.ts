import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsString } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
	@IsString()
	right_answer?: string;
}
