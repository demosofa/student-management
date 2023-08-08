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

@Injectable()
export class AnswerService {
	constructor(
		@InjectRepository(Answer)
		private readonly answerRepository: Repository<Answer>
	) {}

	create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
		try {
			const answer = this.answerRepository.create(createAnswerDto);
			return this.answerRepository.save(answer);
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

	async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
		const answer = await this.answerRepository.findOneBy({ id });
		if (!answer) {
			throw new NotFoundException();
		}

		answer.answer = updateAnswerDto.answer;

		return this.answerRepository.save(answer);
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
