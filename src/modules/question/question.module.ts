import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Role } from '@modules/role/entities/role.entity';
import { UserService } from '@modules/user/user.service';
import { RoleModule, UserModule } from '..';
import { User } from '@modules/user/entities/user.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Question, Role, User]),
		UserModule,
		RoleModule,
	],
	controllers: [QuestionController],
	providers: [QuestionService, UserService],
})
export class QuestionModule {}
