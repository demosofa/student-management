import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarkDto } from './dto/create-mark.dto';
import { Repository } from 'typeorm';
import { Mark } from './entities/mark.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '@modules/question/entities/question.entity';
import { UserService } from '@modules/user/user.service';
import { ContestService } from '@modules/contest/contest.service';

@Injectable()
export class MarkService {
	constructor(
		@InjectRepository(Mark) private markRepos: Repository<Mark>,
		@InjectRepository(Question) private questionRepos: Repository<Question>,
		private useService: UserService,
		private contestService: ContestService
	) {}

	async markAnswer(id: string, answerId: string) {
		const question = await this.questionRepos.findOneBy({ id });
		if (!question) throw new NotFoundException();
		if (question.right_answer === answerId) {
			return question.point;
		} else return 0;
	}

	async create(studentId: string, createMarkDto: CreateMarkDto) {
		const marks = await Promise.all(
			Object.entries(createMarkDto.data).map(([questionId, answerId]) =>
				this.markAnswer(questionId, answerId)
			)
		);
		const finalMark = marks.reduce((prev, curr) => prev + curr, 0);
		const student = await this.useService.findById(studentId);
		const contest = await this.contestService.findOne(createMarkDto.contestId);
		const mark = this.markRepos.create({
			student,
			contest,
			mark: finalMark,
		});
		return this.markRepos.save(mark);
	}

	findAll() {
		return this.markRepos.find({
			relations: {
				contest: true,
				student: true,
			},
		});
	}

	findAllByStudent(id: string) {
		return this.markRepos.find({
			where: {
				student: {
					id,
				},
			},
			relations: {
				contest: true,
			},
		});
	}
}
