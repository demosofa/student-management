import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { IAuthService } from './auth.interface';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { USER_SERVICE } from '../user/user.interface';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
	imports: [UserModule, TypeOrmModule.forFeature([User])],
	controllers: [AuthController],
	providers: [
		{ useClass: AuthService, provide: IAuthService },
		{ useClass: UserService, provide: USER_SERVICE },
	],
})
export class AuthModule {}
