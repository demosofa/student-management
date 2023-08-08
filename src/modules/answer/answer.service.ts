import { Injectable } from '@nestjs/common';
import {
	BadRequestException,
	NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { Question } from '@modules/question/entities/question.entity';

@Injectable()
export class AnswerService {
	constructor(
		@InjectRepository(Answer)
		private readonly answerRepository: Repository<Answer>
	) {}

	async create(createAnswerDto: CreateAnswerDto) {
		try {
			const question = await Question.findOneBy({
				id: createAnswerDto.questionId,
			});
			const answer = this.answerRepository.create(createAnswerDto);

			// return answer;
			return this.answerRepository.save({
				...answer,
				question,
			});
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async findAll(): Promise<Answer[]> {
		try {
			return await this.answerRepository.find();
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async findOne(id: string): Promise<Answer> {
		try {
			const ans = await this.answerRepository.findOneBy({ id });
			if (!ans) {
				throw new NotFoundException();
			}
			return ans;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async update(id: string, updateAnswerDto: UpdateAnswerDto) {
		const question = await Question.findOneBy({
			id: updateAnswerDto.questionId,
		});

		delete updateAnswerDto.questionId;
		const oldData = await this.answerRepository.findOneBy({ id });

		return this.answerRepository.save({
			...oldData,
			...updateAnswerDto,
			question,
		});
	}

	async remove(id: string) {
		try {
			const result = await this.answerRepository.delete(id);
			return result.affected > 0;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}
