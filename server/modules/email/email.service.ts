import { Component } from '@nestjs/common';
import { autobind } from 'core-decorators';
import * as sg from 'sendgrid';
import { IUser } from '../../../types/user';

interface Sub {
  [name: string]: string;
}

@Component()
export class EmailService {
  get mailer() {
    return sg(
      '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'
    );
  }

  @autobind
  async sendMail(
    { email: emailAddress }: IUser,
    templateID: string,
    substitutions: Sub
  ) {
    const { mail } = sg;
    const from = new mail.Email('ben@twofer.co');
    const to = new mail.Email(emailAddress);
    const content = new mail.Content(
      'text/html',
      "I'm replacing the <strong>body tag</strong>"
    );
    const email = new mail.Mail(from, 'Forgot Password', to, content);
    const personalization = new mail.Personalization();
    for (const key of Object.keys(substitutions)) {
      const sub = new mail.Substitution(key, substitutions[key]);
      personalization.addSubstitution(sub);
    }
    personalization.addTo(to);
    email.addPersonalization(personalization);
    email.setTemplateId(templateID);

    const request = this.mailer.emptyRequest({
      body: email.toJSON(),
      method: 'POST',
      path: '/v3/mail/send',
    });

    try {
      await this.mailer.API(request);
    } catch (e) {
      e.response.body.errors.map(console.log);
    }
  }
}
