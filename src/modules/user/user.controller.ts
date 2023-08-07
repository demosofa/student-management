import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Delete,
	Param,
	Query,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { TestPipe } from '@common/pipes/test.pipe';
import { AuthGuard, RoleGuard } from '@common/guards';
import { Role } from '@common/decorators/Role.decorator';
import { ROLE } from '@common/enums';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Get()
	findAll(@Query() queryUserDto: QueryUserDto) {
		return this.userService.findAll(queryUserDto);
	}

	@Get(':username')
	findOne(@Param('username', TestPipe) username: string) {
		return this.userService.findOne(username);
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(':id')
	@Role(ROLE.TEACHER)
	@UseGuards(AuthGuard, RoleGuard)
	remove(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
