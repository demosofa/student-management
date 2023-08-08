import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Role } from '@modules/role/entities/role.entity';
import { RoleModule, UserModule } from '..';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/user/entities/user.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Answer, Role, User]),
		UserModule,
		RoleModule,
	],
	controllers: [AnswerController],
	providers: [AnswerService, UserService],
})
export class AnswerModule {}
