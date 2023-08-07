import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export const USER_SERVICE = 'IUserService';

export interface IUserService {
	create(createUserDto: CreateUserDto): Promise<User>;

	findAll(queryUserDto: QueryUserDto): Promise<User[]>;

	findById(id: string): Promise<User>;

	findOne(username: string): Promise<User>;

	update(id: string, updateUserDto: UpdateUserDto): Promise<User>;

	remove(id: string): Promise<DeleteResult>;
}
