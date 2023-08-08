import { User } from '@modules/user/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id: string;

	@IsNotEmpty()
	@IsString()
	@Column()
	roleName: string;

	@OneToMany(() => User, (user) => user.role)
	user: User;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}
