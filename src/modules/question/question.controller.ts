import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Roles } from '@common/decorators/Roles.decorator';
import { ROLE } from '@common/enums';
import { ResponseItem } from './dto/ResponseItem.dto';
import { Question } from './entities/question.entity';
import { AuthGuard, RoleGuard } from '@common/guards';

@Controller('question')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) {}

	@Roles(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	@Post()
	create(@Body() createQuestionDto: CreateQuestionDto) {
		return this.questionService.create(createQuestionDto);
	}

	@Roles(ROLE.TEACHER, ROLE.STUDENT)
	@UseGuards(AuthGuard, RoleGuard)
	@Get()
	findAll() {
		return this.questionService.findAll();
	}

	@Roles(ROLE.TEACHER, ROLE.STUDENT)
	@UseGuards(AuthGuard, RoleGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.questionService.findOne(id);
	}

	@Roles(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateQuestionDto: UpdateQuestionDto
	) {
		return this.questionService.update(id, updateQuestionDto);
	}

	@Roles(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	@Delete(':id')
	remove(@Param('id') id: string): Promise<ResponseItem<Question>> {
		return this.questionService.remove(id);
	}

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.questionService.deleteQues(id);
	// }
}
