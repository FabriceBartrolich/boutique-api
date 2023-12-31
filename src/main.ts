import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(`api`);
  app.useGlobalPipes(new ValidationPipe());


    const config = new DocumentBuilder()
    .setTitle('Boutique API')
    .setDescription('Boutique API description')
    .setVersion('1.0')
    .addTag('Boutique')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
    //permet d'utiliser cors pour lier le front et le back
    app.enableCors(); 
  await app.listen(3000);
}
bootstrap();
