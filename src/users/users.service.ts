import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserInput } from 'src/users/dto/new-user.input';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async create(user: NewUserInput): Promise<User> {
		const createdUser = new this.userModel(user);
		return createdUser.save();
	}

	async findOneByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email }).exec();
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async remove(email: string): Promise<boolean> {
		this.userModel.deleteOne((user: User): boolean => user.email === email);
		return true;
	}
}
