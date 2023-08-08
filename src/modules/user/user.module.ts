import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { RoleModule } from '..';
import { RoleService } from '@modules/role/role.service';
import { Role } from '@modules/role/entities/role.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Role]),
		forwardRef(() => RoleModule),
	],
	controllers: [UserController],
	providers: [UserService, RoleService],
	exports: [UserService],
})
export class UserModule {}
