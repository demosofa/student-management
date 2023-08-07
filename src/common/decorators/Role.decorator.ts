import { SetMetadata } from '@nestjs/common';
import { ROLE } from '../enums';

export const Role = (...roles: ROLE[]) => SetMetadata('roles', roles);
