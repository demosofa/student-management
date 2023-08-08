import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { IAuthService } from './auth.interface';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { IUserService } from '@modules/user/user.interface';
import { RoleModule } from '@modules/role/role.module';
import { RoleService } from '@modules/role/role.service';
import { Role } from '@modules/role/entities/role.entity';

@Module({
	imports: [RoleModule, UserModule, TypeOrmModule.forFeature([Role, User])],
	controllers: [AuthController],
	providers: [
		{ useClass: AuthService, provide: IAuthService },
		{ useClass: UserService, provide: IUserService },
		RoleService,
	],
})
export class AuthModule {}
