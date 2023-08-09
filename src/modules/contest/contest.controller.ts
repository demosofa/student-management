import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { ROLE } from '@common/enums';
import { Auth, ReqUser } from '@common/decorators';
import { AuthUser } from '@common/types/authUser.type';

@Controller('contest')
export class ContestController {
	constructor(private readonly contestService: ContestService) {}

	@Post()
	@Auth(ROLE.TEACHER)
	async create(
		@ReqUser() reqUser: AuthUser,
		@Body() createContestDto: CreateContestDto
	) {
		return this.contestService.create(reqUser.id, createContestDto);
	}

	@Get()
	findAll() {
		return this.contestService.findAll(['contestName'], 'ASC');
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.contestService.findOne(id);
	}

	@Patch(':id')
	@Auth(ROLE.TEACHER)
	update(@Param('id') id: string, @Body() updateContestDto: UpdateContestDto) {
		return this.contestService.update(id, updateContestDto);
	}

	@Patch('join/:id')
	@Auth(ROLE.STUDENT)
	join(@Param('id') id: string, @ReqUser() reqUser: AuthUser) {
		return this.contestService.join(id, reqUser.id);
	}

	@Delete(':id')
	@Auth(ROLE.TEACHER)
	remove(@Param('id') id: string) {
		return this.contestService.remove(id);
	}
}
