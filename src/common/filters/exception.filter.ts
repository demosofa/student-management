import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class Exception implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const res = ctx.getResponse<Response>();
		const commonJson = {
			status: exception.getStatus(),
			message: exception.message,
		};
		if (exception.cause == 'not admin') {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json({ ...commonJson, cause: exception.cause });
		}
		return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(commonJson);
	}
}
