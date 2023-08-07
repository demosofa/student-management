import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './dto';
import { IUserService } from './user.interface';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SORT } from '@common/enums/sort.enum';

@Injectable()
export class UserService implements IUserService {
	constructor(@InjectRepository(User) private userRepos: Repository<User>) {}

	async create(createUserDto: CreateUserDto) {
		const isExist = await this.findOne(createUserDto.username);
		if (isExist) throw new BadRequestException();
		const user = this.userRepos.create(createUserDto);
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
			order: {
				[orderBy]: sort,
			},
			skip: (page - 1) * limit,
			take: limit,
		});
	}

	async findById(id: string) {
		return this.userRepos.findOneBy({ id });
	}

	async findOne(username: string) {
		return this.userRepos.findOneBy({ username });
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.userRepos.findOneBy({ id });
		if (user.username != updateUserDto.username) {
			const isExist = await this.findOne(updateUserDto.username);
			if (isExist) throw new BadRequestException();
		}
		await this.userRepos.update(id, updateUserDto);
		return this.userRepos.findOneBy({ id });
	}

	async remove(id: string) {
		return this.userRepos.delete(id);
	}
}
