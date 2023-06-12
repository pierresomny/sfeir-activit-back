import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewIdeaInput } from 'src/ideas/dto/new-idea.input';
import { Idea } from 'src/ideas/model/idea.model';

@Injectable()
export class IdeasService {
	constructor(@InjectModel(Idea.name) private ideaModel: Model<Idea>) {}

	async create(idea: NewIdeaInput): Promise<Idea> {
		const createdIdea = new this.ideaModel(idea);
		return createdIdea.save();
	}

	async findOneById(_id: string): Promise<Idea> {
		return await this.ideaModel.findOne({ _id }).exec();
	}

	async findAll(): Promise<Idea[]> {
		return this.ideaModel.find().exec();
	}

	async remove(_id: string): Promise<boolean> {
		this.ideaModel.deleteOne((idea: Idea): boolean => idea._id === _id);
		return true;
	}
}
