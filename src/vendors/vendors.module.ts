import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { MailModule } from 'src/mailer/mailer.module';

@Module({
  imports: [MailModule],
  controllers: [VendorsController],
  providers: [VendorsService],
})
export class VendorsModule {}
