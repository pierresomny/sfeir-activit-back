import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class NewIdeaInput {

	@Field()
	title: string;

	@Field({ nullable: true })
	@IsOptional()
	description: string;

	@Field({ nullable: true })
	@IsOptional()
	need: string;

	@Field()
	user: string;

	@Field()
	state: string = 'A faire';
}
