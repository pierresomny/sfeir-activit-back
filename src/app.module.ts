import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';

@Module({
	        imports: [
		        UsersModule,
		        RecipesModule,
		        MongooseModule.forRoot('mongodb://localhost:27017/activit'),
		        GraphQLModule.forRoot<ApolloDriverConfig>({
			                                                  driver: ApolloDriver,
			                                                  autoSchemaFile: 'schema.gql',
			                                                  installSubscriptionHandlers: true,
			                                                  buildSchemaOptions: {
				                                                  directives: [
					                                                  new GraphQLDirective({
						                                                                       name: 'upper',
						                                                                       locations: [ DirectiveLocation.FIELD_DEFINITION ],
					                                                                       }),
				                                                  ],
			                                                  },
		                                                  }),
		        UsersModule,
	        ],
        })
export class AppModule {}
