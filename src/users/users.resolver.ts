import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewUserInput } from 'src/users/dto/new-user.input';
import { User } from './model/user.model';
import { UsersService } from './users.service';

const pubSub: PubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => User)
	async user(@Args('email') email: string): Promise<User> {
		const recipe: User = await this.usersService.findOneByEmail(email);
		if (!recipe) {
			throw new NotFoundException(email);
		}
		return recipe;
	}

	@Query(() => [ User ])
	users(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Mutation(() => User)
	async addUser(
		@Args('newUserData') newUserData: NewUserInput,
	): Promise<User> {
		const user: User = await this.usersService.create(newUserData);
		await pubSub.publish('userAdded', { userAdded: user });
		return user;
	}

	@Mutation(() => Boolean)
	async removeUser(@Args('email') email: string): Promise<boolean> {
		return this.usersService.remove(email);
	}

	@Subscription(() => User)
	userAdded() {
		return pubSub.asyncIterator('userAdded');
	}
}
