import {
	BadGatewayException,
	BadRequestException,
	Injectable,
	RequestTimeoutException,
} from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { Repository } from 'typeorm';
import { Contest } from './entities/contest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class ContestService {
	private readonly closeEvent = 'timeout';
	constructor(
		@InjectRepository(Contest)
		private readonly contestRepo: Repository<Contest>,
		private userService: UserService,
		private readonly schedulerRegistry: SchedulerRegistry
	) {}

	async create(teacherId: string, createContestDto: CreateContestDto) {
		const milliseconds =
			new Date(createContestDto.closedAt).getTime() - new Date().getTime();
		const teacher = await this.userService.findById(teacherId);
		try {
			const contestCreate = this.contestRepo.create({
				...createContestDto,
				user: [teacher],
			});
			const result = await this.contestRepo.save(contestCreate);
			const timeOutName = this.closeEvent + contestCreate.id;
			const timeout = setTimeout(async () => {
				await this.contestRepo.update(result.id, { isLoading: false });
				this.schedulerRegistry.deleteTimeout(timeOutName);
			}, milliseconds);

			this.schedulerRegistry.addTimeout(timeOutName, timeout);
			return result;
		} catch (error) {
			throw new BadGatewayException(error.message);
		}
	}

	async join(contestId: string, studentId: string) {
		const contest = await this.findOne(contestId);
		if (!contest.isLoading) throw new RequestTimeoutException();
		try {
			const student = await this.userService.findById(studentId);
			return this.contestRepo.save({
				...contest,
				user:
					contest.user.findIndex((target) => target.id === student.id) != -1
						? contest.user
						: contest.user.concat(student),
			});
		} catch (error) {
			throw new BadGatewayException(error.message);
		}
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
				user: true,
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
