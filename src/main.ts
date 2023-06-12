import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({  // wrong!  in my case, anyway
		               origin: true,
	               });

	await app.listen(3000);
	console.log(`Application is running on: ${ await app.getUrl() }`);
}

bootstrap();
