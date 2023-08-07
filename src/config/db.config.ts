import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_POSTGRE_HOST'),
				port: configService.get('DB_POSTGRE_PORT'),
				username: configService.get('DB_POSTGRE_USERNAME'),
				password: configService.get('DB_POSTGRE_PASSWORD'),
				database: configService.get('DB_POSTGRE_DATABASE'),
				entities: [__dirname + '/../**/*.entity.{ts,js}'],
				synchronize: true,
				logging: true,
			}),
		}),
	],
})
export class DbConfig {}
