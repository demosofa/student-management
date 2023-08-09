import {
	ClassSerializerInterceptor,
	MiddlewareConsumer,
	Module,
	NestModule,
} from '@nestjs/common';
import {
	UserModule,
	AuthModule,
	RoleModule,
	ContestModule,
	QuestionModule,
	AnswerModule,
} from './modules';
import { DbConfig, JwtConfig } from './config';
import { TestMiddleware } from './common/middlewares/test.middleware';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MarkModule } from './modules/mark/mark.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
		DbConfig,
		JwtConfig,
		UserModule,
		AuthModule,
		RoleModule,
		ContestModule,
		QuestionModule,
		AnswerModule,
		MarkModule,
		ScheduleModule.forRoot(),
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(TestMiddleware).forRoutes('*');
	}
}
