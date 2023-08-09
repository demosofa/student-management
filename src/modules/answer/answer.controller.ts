import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	NotFoundException,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Roles } from '@common/decorators/Roles.decorator';
import { ROLE } from '@common/enums';
import { Answer } from './entities/answer.entity';
import { AuthGuard, RoleGuard } from '@common/guards';

@Controller('answer')
export class AnswerController {
	constructor(private readonly answerService: AnswerService) {}

	@Post()
	@Roles(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	create(@Body() createAnswerDto: CreateAnswerDto) {
		return this.answerService.create(createAnswerDto);
	}

	@Get()
	@Roles(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	findAll(): Promise<Answer[]> {
		return this.answerService.findAll();
	}

	@Get(':id')
	@Roles(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	findOne(@Param('id') id: string): Promise<Answer> {
		return this.answerService.findOne(id);
	}

	@Patch(':id')
	@Roles(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
		return this.answerService.update(id, updateAnswerDto);
	}

	@Delete(':id')
	@Roles(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	async remove(@Param('id') id: string) {
		const check = await this.answerService.remove(id);
		if (check) return { message: 'Successfully delete answer' };
		return new NotFoundException();
	}
}
