import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IdeaDocument = HydratedDocument<Idea>;

@ObjectType({ description: 'user' })
@Schema()
export class Idea {
	@Field(() => ID)
	@Prop({ nullable: true })
	_id: string;

	@Field()
	@Prop()
	title: string;

	@Field({ nullable: true })
	@Prop()
	description: string;

	@Field({ nullable: true })
	@Prop()
	need: string;

	@Field()
	@Prop()
	user: string;

	@Field()
	@Prop()
	state: string;

}

export type IdeaState = 'A faire' | 'En cours' | 'Besoin d\'aide' | 'Terminé' | 'Bloqué'

export const IdeaSchema = SchemaFactory.createForClass(Idea);
