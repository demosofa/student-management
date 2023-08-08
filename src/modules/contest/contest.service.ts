import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { Repository } from 'typeorm';
import { Contest } from './entities/contest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class ContestService {
	private readonly closeEvent = 'timeout';
	constructor(
		@InjectRepository(Contest)
		private readonly contestRepo: Repository<Contest>,
		private readonly schedulerRegistry: SchedulerRegistry
	) {}

	async create(createContestDto: CreateContestDto) {
		const milliseconds =
			new Date(createContestDto.closedAt).getTime() - new Date().getTime();

		const contestCreate = this.contestRepo.create(createContestDto);
		const result = await this.contestRepo.save(contestCreate);
		const timeOutName = this.closeEvent + contestCreate.id;
		const timeout = setTimeout(async () => {
			await this.contestRepo.update(result.id, { isLoading: false });
			this.schedulerRegistry.deleteTimeout(timeOutName);
		}, milliseconds);

		this.schedulerRegistry.addTimeout(timeOutName, timeout);
		return result;
	}

	async findAll(
		orderBy = ['id', 'contestName'],
		orderDirection: 'ASC' | 'DESC' = 'ASC'
	): Promise<Contest[]> {
		return await this.contestRepo.find({
			order: orderBy.reduce((order, field) => {
				order[field] = orderDirection;
				return order;
			}, {}),
		});
	}

	async findOne(id: string) {
		return await this.contestRepo.findOne({
			where: { id },
			relations: {
				question: {
					answer: true,
				},
			},
		});
	}

	async update(id: string, updateContestDto: UpdateContestDto) {
		const index = await this.findOne(id);
		if (!index) {
			throw new BadRequestException('Contest not found');
		}
		if (updateContestDto.closedAt) {
			const timeOutName = this.closeEvent + id;
			if (this.schedulerRegistry.getTimeouts().includes(timeOutName))
				this.schedulerRegistry.deleteTimeout(timeOutName);
			const milliseconds =
				new Date(updateContestDto.closedAt).getTime() - new Date().getTime();
			const timeout = setTimeout(async () => {
				await this.contestRepo.update(id, { isLoading: false });
				this.schedulerRegistry.deleteTimeout(timeOutName);
			}, milliseconds);
			this.schedulerRegistry.addTimeout(timeOutName, timeout);
		}
		return this.contestRepo.save({ ...index, ...updateContestDto });
	}

	async remove(id: string) {
		const index = await this.findOne(id);
		if (!index) {
			throw new BadRequestException('Contest not found');
		}
		const timeOutName = this.closeEvent + id;
		if (this.schedulerRegistry.getTimeouts().includes(timeOutName))
			this.schedulerRegistry.deleteTimeout(timeOutName);
		this.contestRepo.softDelete(id);
	}
}
