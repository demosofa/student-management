import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthUser } from '@common/types/authUser.type';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService,
		private userService: UserService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context
			.switchToHttp()
			.getRequest<Request & { user: AuthUser }>();
		if (!req.headers.authorization) throw new UnauthorizedException();
		const [type, token] = req.headers.authorization.split(' ');
		if (type != 'Bearer' || !token) throw new UnauthorizedException();
		try {
			const secret = this.configService.get('SECRET');
			const payload = await this.jwtService.verifyAsync<AuthUser>(token, {
				secret,
			});
			const isExist = await this.userService.findById(payload.id);
			if (!isExist) throw new Error('There is no user');
			req.user = payload;
			return true;
		} catch (error) {
			throw new UnauthorizedException(error.message);
		}
	}
}
