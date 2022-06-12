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
        host: 'smtp.sendgrid.net',
        secure: false,
        port: 25, //25,586 - 465 - ssl
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      defaults: {
        from: '"Cloudia App" <cloudiaapp@gmail.com>',
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
