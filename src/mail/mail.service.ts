import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Users, token: string) {
    const url = `http://localhost:4200/success?token=${token}`;

    await this.mailerService.sendMail({
      to: user.eMail,
      //from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Cloudia App! Confirm your Email',
      template: 'confirmation', 
      context: { 
        //name: user.firstName + " " + user.lastName,
        url,
      },
    });
  }

  async sendUserResetPwd(user: Users, pwd: string) {
    const url = `localhost:3000/auth/confirmpwd?email=${user.eMail}&pwd=${pwd}&token=${user.confirmToken}`;

    await this.mailerService.sendMail({
      to: user.eMail,
      //from: '"Support Team" <support@example.com>', // override default from
      subject: 'Reset your Cloudia App Password! Confirm your new Password',
      template: 'resetpwd', 
      context: { 
        //name: user.firstName + " " + user.lastName,
        pwd,
        url,
      },
    });
  }
}
