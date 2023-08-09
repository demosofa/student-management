import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateMarkDto {
	@IsNotEmpty()
	@IsString()
	contestId: string;

	@IsNotEmpty()
	@IsObject()
	data: { [key: string]: string };
}
