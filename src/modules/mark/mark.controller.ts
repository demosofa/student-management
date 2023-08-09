import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MarkService } from './mark.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { ReqUser } from '@common/decorators/ReqUser.decorator';
import { AuthUser } from '@common/types/authUser.type';
import { Auth } from '@common/decorators';
import { ROLE } from '@common/enums';

@Controller('mark')
export class MarkController {
	constructor(private readonly markService: MarkService) {}

	@Post()
	@Auth(ROLE.STUDENT)
	create(@ReqUser() reqUser: AuthUser, @Body() createMarkDto: CreateMarkDto) {
		return this.markService.create(reqUser.id, createMarkDto);
	}

	@Get()
	findAll() {
		return this.markService.findAll();
	}

	@Get(':id')
	findAllByStudent(@Param('id') id: string) {
		return this.markService.findAllByStudent(id);
	}
}
