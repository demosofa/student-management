import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Role } from '@modules/role/entities/role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Answer, Role])],
	controllers: [AnswerController],
	providers: [AnswerService],
})
export class AnswerModule {}
