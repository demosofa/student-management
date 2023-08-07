import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TestInterceptor } from './common/interceptors/test.interceptor';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalInterceptors(new TestInterceptor());

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			validationError: { target: false },
		})
	);

	await app.listen(3000);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
