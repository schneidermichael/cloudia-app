import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: 'smtp.mailtrap.io',
        secure: false,
        port: 2525,
        auth: {
          user: 'bf9e0c47df2d8b',
          pass: 'a206ed45278b58',
        },
      },
      defaults: {
        from: '"No Reply Cloudia" <noreply@cloudia.de>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: false,
        },
      },
    }),
    MailerModule
  ],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}
