import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
	constructor(
		@InjectRepository(Answer) private answerRepos: Repository<Answer>
	) {}
	async create(createAnswerDto: CreateAnswerDto) {
		const createAnswer = await this.answerRepos.create(createAnswerDto);
		return await this.answerRepos.save(createAnswer);
	}

	async findAll() {
		return await this.answerRepos.find();
	}

	findOne(id: string) {
		return `This action returns a #${id} answer`;
	}

	update(id: string, updateAnswerDto: UpdateAnswerDto) {
		return `This action updates a #${id} answer`;
	}

	remove(id: string) {
		return `This action removes a #${id} answer`;
	}
}
