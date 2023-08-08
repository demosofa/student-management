import { ROLE } from '@common/enums';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
	@IsNotEmpty()
	@IsString()
	name: ROLE;
}
