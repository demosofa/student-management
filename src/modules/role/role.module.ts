import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@modules/user/entities/user.entity';
import { Role } from '@modules/role/entities/role.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Role])],
	controllers: [RoleController],
	providers: [RoleService],
})
export class RoleModule {}
