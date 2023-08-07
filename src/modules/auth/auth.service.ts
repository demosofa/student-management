import {
	BadRequestException,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from './auth.interface';
import { LoginUserDto, RegisterUserDto } from './dto';
import { IUserService, USER_SERVICE } from '../user/user.interface';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		@Inject(USER_SERVICE) private userService: IUserService,
		private jwtService: JwtService
	) {}

	async login(loginUserDto: LoginUserDto) {
		const user = await this.userService.findOne(loginUserDto.username);
		if (!user) throw new UnauthorizedException();
		const { password, id, username, role } = user;
		const check = compareSync(loginUserDto.password, password);
		if (!check) throw new UnauthorizedException();
		return this.jwtService.signAsync({ id, username, role });
	}

	async register(registerUserDto: RegisterUserDto) {
		const user = await this.userService.findOne(registerUserDto.username);
		if (user) throw new BadRequestException();
		registerUserDto.password = hashSync(registerUserDto.password, 10);
		const { id, username, role } = await this.userService.create(
			registerUserDto
		);
		return this.jwtService.signAsync({ id, username, role });
	}
}
