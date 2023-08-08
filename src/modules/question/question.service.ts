import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { ResponseItem } from './dto/ResponseItem.dto';

@Injectable()
export class QuestionService {
	constructor(
		@InjectRepository(Question) private questionRepos: Repository<Question>
	) {}
	async checkAnswer(id: string, answerId: string) {
		const question = await this.findOne(id);
		if (!question) throw new BadRequestException();
		if (question.right_answer === answerId) {
			return question.point;
		} else return 0;
	}
	async create(createQuestionDto: Partial<Question>) {
		const createQuestion = await this.questionRepos.create(createQuestionDto);
		return await this.questionRepos.save(createQuestion);
	}

	async findAll() {
		const findAllQuestion = await this.questionRepos.find({
			relations: {
				answer: true,
			},
		});
		return findAllQuestion;
	}

	async findOne(id: string) {
		try {
			const result = await this.questionRepos.findOne({
				where: { id },
				relations: {
					answer: true,
				},
			});
			if (!result) throw new NotFoundException();
			return result;
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async update(
		id: string,
		updateQuestionDto: UpdateQuestionDto
	): Promise<ResponseItem<Question>> {
		try {
			const updateQuestion = await this.questionRepos.update(
				id,
				updateQuestionDto
			);
			if (!updateQuestion) {
				throw new NotFoundException();
			}

			const question: Question = await this.questionRepos.findOne({
				where: { id },
			});
			return new ResponseItem<Question>(question, 'Success');
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async remove(id: string): Promise<ResponseItem<Question>> {
		try {
			await this.questionRepos.delete(id);
			const question: Question = await this.questionRepos.findOne({
				where: { id },
			});
			return new ResponseItem<Question>(question, 'delete success');
		} catch (error) {
			throw new BadRequestException(error.mess);
		}
	}

	async updateQuestion(
		id: string,
		updatedData: Partial<Question>
	): Promise<Question> {
		const entityToUpdate = await this.questionRepos.findOne({ where: { id } });
		if (!entityToUpdate) {
			throw new NotFoundException('Entity not found');
		}

		Object.assign(entityToUpdate, updatedData);

		const updatedEntity = await this.questionRepos.save(entityToUpdate);

		return updatedEntity;
	}

	// async deleteQues(id: string): Promise<Question> {
	// 	const entityToDelete = await this.questionRepos.findOne({
	// 		where: { id },
	// 	});
	// 	if (!entityToDelete) {
	// 		// Handle the case where the entity is not found
	// 		throw new NotFoundException('Entity not found');
	// 	}

	// 	return await this.questionRepos.remove(entityToDelete);
	// }
}
