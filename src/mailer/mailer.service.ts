import { Injectable, Logger } from '@nestjs/common';
import {
  SENT_OTP,
  MAIL_QUEUE,
  WELCOME_MSG,
  SENT_USER_URL,
  BENEFICIARY_ADDED,
  BENEFICIARY_ASSIGNED_TOKEN,
} from './constants';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { jobOptions } from './config/bullOptions';

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);

  constructor(@InjectQueue(MAIL_QUEUE) private readonly _mailQueue: Queue) {}

  public async sendOTP({
    email,
    otp,
    type,
  }: {
    email: string;
    otp: string;
    type: string;
  }): Promise<void> {
    try {
      await this._mailQueue.add(
        SENT_OTP,
        {
          email,
          otp,
          type: '',
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${email}`);
      throw error;
    }
  }

  public async sendURLMail({ email, url }: { email: string; url: string }): Promise<void> {
    try {
      await this._mailQueue.add(
        SENT_USER_URL,
        {
          email,
          url,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${email}`);
      throw error;
    }
  }

  public async welcome({ name, email }: { name: string; email: string }): Promise<void> {
    try {
      await this._mailQueue.add(
        WELCOME_MSG,
        {
          name,
          email,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${email}`);
      throw error;
    }
  }

  // BENEFICIARY_ADDED

  async sendBeneficiaryAddedMail({ email, url }: { email: string; url: string }): Promise<void> {
    try {
      await this._mailQueue.add(
        BENEFICIARY_ADDED,
        {
          email,
          url,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing added mail to beneficairy ${email}`);
      throw error;
    }
  }

  async sendBeneficiaryAssignedTokenMail({
    email,
    token,
    url,
  }: {
    email: string;
    token: string;
    url: string;
  }): Promise<void> {
    try {
      await this._mailQueue.add(
        BENEFICIARY_ASSIGNED_TOKEN,
        {
          email,
          token,
          url,
        },
        jobOptions,
      );
    } catch (error) {
      this._logger.error(`Error queueing assigned token mail to beneficairy ${email}`);
      throw error;
    }
  }
}
