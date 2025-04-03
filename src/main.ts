import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  /**
   * Swaggerconfiguration
   */
  const config = new DocumentBuilder()
    .setTitle('NestJs Masterclass - Blog app API')
    .setDescription('User the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT LIcense', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  // Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
