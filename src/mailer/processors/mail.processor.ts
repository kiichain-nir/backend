import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import {
  SENT_OTP,
  MAIL_QUEUE,
  WELCOME_MSG,
  SENT_USER_URL,
  BENEFICIARY_ADDED,
  BENEFICIARY_ASSIGNED_TOKEN,
} from '../constants';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
@Processor(MAIL_QUEUE)
export class MailProcessor {
  private readonly _logger = new Logger(MailProcessor.name);

  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public onError(job: Job<any>, error: any) {
    this._logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    try {
      return this._mailerService.sendMail({
        to: this._configService.get('EMAIL_ADDRESS'),
        from: this._configService.get('EMAIL_ADDRESS'),
        subject: 'Something went wrong with server!!',
        template: './error',
        context: {},
      });
    } catch {
      this._logger.error('Failed to send confirmation email to admin');
    }
  }

  @Process(SENT_OTP)
  public async sendOTP(job: Job<{ email: string; otp: string }>) {
    this._logger.log(`Sending otp email to '${job.data.email}'`);

    try {
      return this._mailerService.sendMail({
        to: job.data.email,
        from: this._configService.get('EMAIL_ADDRESS'),
        subject: 'Sign In OTP',
        template: './otp',
        context: { name: job.data.email, otp: job.data.otp },
      });
    } catch {
      this._logger.error(`Failed to send confirmation email to '${job.data.email}'`);
    }
  }

  @Process(SENT_USER_URL)
  public async sendMailVendor(job: Job<{ email: string; url: string }>) {
    this._logger.log(`Sending email to vendor: '${job.data.email}'`);

    try {
      return this._mailerService.sendMail({
        to: job.data.email,
        from: this._configService.get('EMAIL_ADDRESS'),
        subject: 'Welcome to Nirbhik',
        template: './otp',
        context: { name: job.data.email, url: job.data.url },
      });
    } catch {
      this._logger.error(`Failed to send confirmation email to '${job.data.email}'`);
    }
  }

  @Process(BENEFICIARY_ADDED)
  public async sendBeneficiaryAddedMail(job: Job<{ email: string; url: string }>) {
    this._logger.log(`Sending email to beneficiary: '${job.data.email}'`);

    try {
      return this._mailerService.sendMail({
        to: job.data.email,
        from: this._configService.get('EMAIL_ADDRESS'),
        subject: 'Welcome to Nirbhik',
        template: './beneficiary-added',
        context: { name: job.data.email, url: job.data.url },
      });
    } catch {
      this._logger.error(`Failed to send confirmation email to '${job.data.email}'`);
    }
  }

  @Process(BENEFICIARY_ASSIGNED_TOKEN)
  public async sendBeneficiaryAssignedTokenMail(
    job: Job<{ email: string; token: string; url: string }>,
  ) {
    this._logger.log(`Sending email to beneficiary: '${job.data.email}'`);

    try {
      return this._mailerService.sendMail({
        to: job.data.email,
        from: this._configService.get('EMAIL_ADDRESS'),
        subject: 'Welcome to Nirbhik',
        template: './beneficiary-assigned-token',
        context: { name: job.data.email, token: job.data.token, url: job.data.url },
      });
    } catch {
      this._logger.error(`Failed to send confirmation email to '${job.data.email}'`);
    }
  }

  @Process(WELCOME_MSG)
  public async welcome(job: Job<{ email: string; name: string }>) {
    this._logger.log(`Sending welcome email to '${job.data.email}'`);

    try {
      return this._mailerService.sendMail({
        to: job.data.email,
        from: this._configService.get('EMAIL_ADDRESS'),
        subject: 'Greetings from Seed2.0',
        template: './welcome',
        context: { name: job.data.name },
      });
    } catch {
      this._logger.error(`Failed to send confirmation email to '${job.data.email}'`);
    }
  }
}
