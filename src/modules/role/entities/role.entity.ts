import { User } from '@modules/user/entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Role extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@IsNotEmpty()
	@IsString()
	@Column({ unique: true })
	name: string;

	@OneToMany(() => User, (user) => user.role)
	user: User[];

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}
