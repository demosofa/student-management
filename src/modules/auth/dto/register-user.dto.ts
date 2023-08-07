import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsStrongPassword()
	password: string;

	@IsNotEmpty()
	@IsString()
	code: string;
}
