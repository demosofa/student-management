import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { Contest } from './entities/contest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Contest])],
	controllers: [ContestController],
	providers: [ContestService],
})
export class ContestModule {}
