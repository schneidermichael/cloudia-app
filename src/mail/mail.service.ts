import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string, host: string) {
    const url = `http://${host}/success?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      //from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Cloudia App! Confirm your Email',
      template: 'confirmation',
      context: {
        url,
      },
    });
  }
}
