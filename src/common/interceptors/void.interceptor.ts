import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class VoidInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> | Promise<Observable<any>> {
		//those code before next will run first before route handler

		return next.handle().pipe(
			map((responseBody) => {
				if (!responseBody) return { message: 'Successfully' };
				return responseBody;
			})
		);
	}
}
