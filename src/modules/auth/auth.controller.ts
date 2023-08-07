import { Body, Controller, Inject, Post, UseFilters } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { IAuthService } from './auth.interface';
import { Exception } from '@common/filters/exception.filter';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(IAuthService) private readonly authService: IAuthService
	) {}

	@Post('login')
	@UseFilters(Exception)
	login(@Body() loginUserDto: LoginUserDto) {
		return this.authService.login(loginUserDto);
	}

	@Post('register')
	register(@Body() registerUserDto: RegisterUserDto) {
		return this.authService.register(registerUserDto);
	}
}
