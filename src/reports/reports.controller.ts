import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('reports')
@ApiTags('Reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('beneficiaries-geo-data')
  getBeneficiariesGeoData(@Query() query) {
    return this.reportsService.getBeneficiariesGeoData(query);
  }

  @Get('demography-gender')
  getDemographyGender(@Query() query) {
    return this.reportsService.getDemographyGender(query);
  }

  @Get('demography-age-range')
  getDemographyAge(@Query() query) {
    return this.reportsService.getDemographyAgeRange(query);
  }
}
