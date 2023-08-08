import { IsDateString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateContestDto {
	@IsNotEmpty()
	@MaxLength(50)
	contestName: string;

	@IsNotEmpty()
	@IsDateString()
	closedAt: string;
}
