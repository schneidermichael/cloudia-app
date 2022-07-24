import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/* istanbul ignore file */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Cloudia Public API - OpenAPI 3.0')
    .setDescription(
      'This is the Cloudia Public API based on the OpenAPI 3.0 specification.',
    )
    .setVersion('1.0')
    .setContact(
      'Contact the developer',
      '',
      'karim.schierbauer@stud.fh-campuswien.ac.at;michael.schneider@stud.fh-campuswien.ac.at;david.schedler@stud.fh-campuswien.ac.at',
    )
    .setLicense(
      'MIT license',
      'https://github.com/schneidermichael/cloudia-ui/blob/main/LICENSE',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
