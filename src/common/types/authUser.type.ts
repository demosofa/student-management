import { ROLE } from '@common/enums';

export type AuthUser = {
	id: string;
	username: string;
	role: ROLE;
};
