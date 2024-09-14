import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestContextService } from 'src/request-context/request-context.service';

@Injectable()
export class ReportsService {
  constructor(
    private prisma: PrismaService,
    private requestContextService: RequestContextService,
  ) {}
  async getBeneficiariesGeoData(query: any) {
    return this.prisma.beneficiary.findMany({
      where: {
        project: {
          userWallet: this.requestContextService.getUserWalletAddress(),
          uuid: query.projectId,
        },
      },
      select: {
        latitude: true,
        longitude: true,
      },
    });
  }
  async getDemographyGender(query: any) {
    console.log('query', query);
    const groupedData = await this.prisma.beneficiary.groupBy({
      by: ['gender'],
      _count: {
        gender: true,
      },
      where: {
        project: {
          userWallet: this.requestContextService.getUserWalletAddress(),
          uuid: query.projectId,
        },
      },
    });

    const result = {};
    groupedData.forEach(item => {
      result[item.gender] = item._count.gender;
    });

    return result;
  }
  async getDemographyAgeRange(query: any) {
    const beneficiaries = await this.prisma.beneficiary.findMany({
      select: {
        age: true,
      },
      where: {
        project: {
          userWallet: this.requestContextService.getUserWalletAddress(),
          uuid: query.projectId,
        },
      },
    });

    const ageRanges = {
      '0-9': 0,
      '10-19': 0,
      '20-29': 0,
      '30-39': 0,
      '40-49': 0,
      '50-59': 0,
      '60+': 0,
    };

    beneficiaries.forEach(beneficiary => {
      const age = beneficiary.age;
      if (age >= 0 && age <= 9) ageRanges['0-9']++;
      else if (age >= 10 && age <= 19) ageRanges['10-19']++;
      else if (age >= 20 && age <= 29) ageRanges['20-29']++;
      else if (age >= 30 && age <= 39) ageRanges['30-39']++;
      else if (age >= 40 && age <= 49) ageRanges['40-49']++;
      else if (age >= 50 && age <= 59) ageRanges['50-59']++;
      else if (age >= 60) ageRanges['60+']++;
    });

    return ageRanges;
  }
}
