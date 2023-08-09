import { AuthUser } from '@common/types/authUser.type';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const ReqUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		return ctx.switchToHttp().getRequest<Request & { user: AuthUser }>().user;
	}
);
