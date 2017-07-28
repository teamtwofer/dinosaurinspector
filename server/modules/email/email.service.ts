import { Component } from '@nestjs/common';
import { autobind } from 'core-decorators';
import postmark = require('postmark');
import { IUser } from '../../../types/user';
import { ForgotPassword } from '../../entities/forgot-password.entity';

interface Fields {
  [name: string]: string;
}

@Component()
export class EmailService {
  private get mailer() {
    return new postmark.Client(
      process.env.NODE_ENV === 'production'
        ? '012f8310-ee31-462b-a4e8-e220b8706c2e'
        : 'POSTMARK_API_TEST',
      {}
    );
  }

  @autobind
  async sendForgotPasswordEmail(
    user: IUser,
    forgotPassword: ForgotPassword,
    parsedUA: any
  ) {
    return this.sendMail(user, '2382981', {
      name: user.name,
      actionUrl:
        'https://twofer.co/account/recover-password/' + forgotPassword.id,
      operatingSystem: parsedUA.os.name,
      browserName: parsedUA.browser.name,
      supportUrl: 'email:ben@twofer.co',
    });
  }

  @autobind
  private async sendMail(
    { email: emailAddress }: IUser,
    templateID: string,
    substitutions: Fields
  ) {
    this.mailer.sendEmailWithTemplate(
      {
        From: 'ben@twofer.co',
        TemplateId: templateID,
        TemplateModel: substitutions,
        To: emailAddress,
      },
      () => {
        // tslint:disable-next-line:no-console
        console.log(`Email: ${templateID} was sent correctly`);
      }
    );
  }
}
