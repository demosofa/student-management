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

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>();
		const [type, token] = req.headers.authorization.split(' ');
		if (type != 'Bearer' || !token) throw new UnauthorizedException();
		try {
			const secret = this.configService.get('SECRET');
			const payload = await this.jwtService.verifyAsync<AuthUser>(token, {
				secret,
			});
			req['user'] = payload;
			return true;
		} catch (error) {
			throw new UnauthorizedException(error.message);
		}
	}
}
