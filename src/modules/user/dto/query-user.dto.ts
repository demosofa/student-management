import { IsEnum, IsString } from 'class-validator';
import { SORT } from '@common/enums/sort.enum';

export class QueryUserDto {
	@IsString()
	search: string;

	@IsString()
	orderBy: string;

	@IsEnum(SORT)
	sort: string;

	page: number;
	limit: number;
}
