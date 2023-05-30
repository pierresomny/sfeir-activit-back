import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class NewUserInput {

	@Field()
	email: string;

	@Field()
	name: string;

	@Field({ nullable: true })
	@IsOptional()
	firstName?: string;

	@Field({ nullable: true })
	@IsOptional()
	lastName?: string;

	@Field()
	photoUrl: string;
}
