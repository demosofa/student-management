import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { Contest } from './entities/contest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule, UserModule } from '..';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/user/entities/user.entity';
import { RoleService } from '@modules/role/role.service';
import { Role } from '@modules/role/entities/role.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Contest, User, Role]),
		UserModule,
		RoleModule,
	],
	controllers: [ContestController],
	providers: [ContestService, UserService, RoleService],
	exports: [ContestService],
})
export class ContestModule {}
