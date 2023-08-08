import {
	Injectable,
	BadRequestException,
	NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dto';
import { IUserService } from './user.interface';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SORT, ROLE } from '@common/enums';
import { RoleService } from '@modules/role/role.service';

@Injectable()
export class UserService implements IUserService {
	constructor(
		@InjectRepository(User) private userRepos: Repository<User>,
		private roleService: RoleService
	) {}

	async create(targetRole: ROLE, createUserDto: CreateUserDto) {
		const isExist = await this.userRepos.findOneBy({
			username: createUserDto.username,
		});
		if (isExist) throw new BadRequestException();
		const role = await this.roleService.findOne(targetRole);
		const user = this.userRepos.create({ ...createUserDto, role });
		return this.userRepos.save(user);
	}

	async findAll(queryUserDto: QueryUserDto) {
		let { sort, orderBy, page, limit } = queryUserDto;
		if (!orderBy) orderBy = 'id';
		if (!sort) sort = SORT.ASC;
		if (!page) page = 1;
		if (!limit) limit = 10;
		return this.userRepos.find({
			where: {
				username: queryUserDto.search || undefined,
			},
			relations: {
				role: true,
			},
			order: {
				[orderBy]: sort,
			},
			skip: (page - 1) * limit,
			take: limit,
		});
	}

	async findById(id: string) {
		return this.userRepos.findOne({
			where: {
				id,
			},
			relations: {
				role: true,
			},
		});
	}

	async findOne(username: string) {
		return this.userRepos.findOne({
			where: {
				username,
			},
			relations: {
				role: true,
			},
		});
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.findById(id);
		if (user.username != updateUserDto.username) {
			const isExist = await this.userRepos.findOneBy({
				username: updateUserDto.username,
			});
			if (isExist) throw new BadRequestException();
		}
		let role = user.role;
		if (updateUserDto.roleId) {
			role = await this.roleService.findById(updateUserDto.roleId);
		}
		delete updateUserDto.roleId;
		return this.userRepos.save({ ...user, ...updateUserDto, role });
	}

	async remove(id: string) {
		const { affected } = await this.userRepos.delete(id);
		if (!affected) throw new NotFoundException();
	}
}
