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
import { ContestService } from './contest.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { Roles } from '@common/decorators/Roles.decorator';
import { ROLE } from '@common/enums';
import { AuthGuard, RoleGuard } from '@common/guards';

@Controller('contest')
export class ContestController {
	constructor(private readonly contestService: ContestService) {}

	@Post()
	// @Role(ROLE.TEACHER)
	// @UseGuards(AuthGuard, RoleGuard)
	async create(@Body() createContestDto: CreateContestDto) {
		const result = await this.contestService.create(createContestDto);
		return result;
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
	@Roles(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	update(@Param('id') id: string, @Body() updateContestDto: UpdateContestDto) {
		return this.contestService.update(id, updateContestDto);
	}

	@Delete(':id')
	// @Role(ROLE.TEACHER)
	// @UseGuards(AuthGuard, RoleGuard)
	remove(@Param('id') id: string) {
		return this.contestService.remove(id);
	}
}
