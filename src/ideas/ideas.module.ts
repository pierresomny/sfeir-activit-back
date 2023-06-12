import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeasResolver } from 'src/ideas/ideas.resolver';
import { IdeasService } from 'src/ideas/ideas.service';
import { Idea, IdeaSchema } from './model/idea.model';

@Module({
	        imports: [ MongooseModule.forFeature([ { name: Idea.name, schema: IdeaSchema } ]) ],
	        providers: [ IdeasService, IdeasResolver ],
        })
export class IdeasModule {}
