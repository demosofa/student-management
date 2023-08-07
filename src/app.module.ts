import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(TestMiddleware).forRoutes('*');
	}
}
