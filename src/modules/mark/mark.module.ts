import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { Role } from '@modules/role/entities/role.entity';
import { User } from '@modules/user/entities/user.entity';
import { Contest } from '@modules/contest/entities/contest.entity';
import { ContestModule, RoleModule, UserModule } from '..';
import { UserService } from '@modules/user/user.service';
import { ContestService } from '@modules/contest/contest.service';
import { Question } from '@modules/question/entities/question.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Mark, Role, User, Contest, Question]),
		RoleModule,
		UserModule,
		ContestModule,
	],
	controllers: [MarkController],
	providers: [MarkService, UserService, ContestService],
})
export class MarkModule {}
