import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@ObjectType({ description: 'user' })
@Schema()
export class User {

	@Field()
	@Prop({ unique: true })
	email: string;

	@Field()
	@Prop()
	name: string;

	@Field({ nullable: true })
	@Prop()
	firstName: string;

	@Field({ nullable: true })
	@Prop()
	lastName: string;

	@Field()
	@Prop()
	photoUrl: string;

	@Field({ nullable: true })
	@Prop()
	branch: string;

	@Field({ nullable: true })
	@Prop()
	technicalColor: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
