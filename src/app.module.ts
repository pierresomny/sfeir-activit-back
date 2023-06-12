import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import envConfig from 'src/config/env.config';
import { JwtMiddleware } from 'src/config/jwt.middleware';
import { IdeasModule } from 'src/ideas/ideas.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth/auth.controller';

@Module({
	        imports: [
		        UsersModule,
		        IdeasModule,
		        JwtModule,
		        ConfigModule.forRoot({
			                             load: [ envConfig ],
			                             isGlobal: true,
		                             }),
		        MongooseModule.forRootAsync({
			                                    imports: undefined,
			                                    inject: [ ConfigService ],
			                                    useFactory: async (configService: ConfigService) => {
				                                    return { uri: configService.get<string>('mongo_uri') };
			                                    }
			                                    ,
		                                    }),
		        GraphQLModule.forRoot({
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
	        ],
	        controllers: [AuthController],
        })
export class AppModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer
			.apply(JwtMiddleware)
			.forRoutes('*'); // Apply middleware to all routes
	}
}
