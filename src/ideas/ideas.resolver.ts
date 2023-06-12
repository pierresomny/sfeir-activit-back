import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Idea } from 'src/ideas/model/idea.model';
import { NewIdeaInput } from './dto/new-idea.input';
import { IdeasService } from './ideas.service';

const pubSub: PubSub = new PubSub();

@Resolver(() => Idea)
export class IdeasResolver {
	constructor(private readonly ideasService: IdeasService) {}

	@Query(() => Idea)
	async idea(@Args('_id') _id: string): Promise<Idea> {
		const recipe: Idea = await this.ideasService.findOneById(_id);
		if (!recipe) {
			throw new NotFoundException(_id);
		}
		return recipe;
	}

	@Query(() => [ Idea ])
	ideas(): Promise<Idea[]> {
		return this.ideasService.findAll();
	}

	@Mutation(() => Idea)
	async addIdea(
		@Args('newIdeaData') newIdeaData: NewIdeaInput,
	): Promise<Idea> {
		const idea: Idea = await this.ideasService.create(newIdeaData);
		await pubSub.publish('ideaAdded', { ideaAdded: idea });
		return idea;
	}

	@Mutation(() => Boolean)
	async removeIdea(@Args('_id') _id: string): Promise<boolean> {
		return this.ideasService.remove(_id);
	}

	@Subscription(() => Idea)
	ideaAdded() {
		return pubSub.asyncIterator('ideaAdded');
	}
}
