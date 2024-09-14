import { Injectable } from '@nestjs/common';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { Beneficiary, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { MailService } from 'src/mailer/mailer.service';

@Injectable()
export class BeneficiariesService {
  constructor(private readonly prisma: PrismaService, private mailService: MailService) {}

  async create(createBeneficiaryDto: CreateBeneficiaryDto): Promise<Beneficiary> {
    const res = await this.prisma.beneficiary.create({
      data: createBeneficiaryDto,
    });

    if (res)
      this.mailService.sendURLMail({
        email: res.email,
        url: `${process.env.FRONTEND_URL}/beneficiary/${res.uuid}`,
      });

    return res;
  }

  async findAll(queries: any) {
    const where: Prisma.BeneficiaryWhereInput = {};

    if (queries?.projectUUID) {
      where.project = {
        uuid: queries.projectUUID,
      };
    }

    return paginate(
      this.prisma.beneficiary,
      {
        where,
        orderBy: {
          createdAt: 'desc',
        },
      },
      {
        page: queries.page,
        perPage: queries.perPage,
      },
    );
  }

  async findOne(uuid: string): Promise<Beneficiary> {
    return this.prisma.beneficiary.findUnique({
      where: { uuid },
    });
  }

  async update(uuid: string, updateBeneficiaryDto: UpdateBeneficiaryDto): Promise<Beneficiary> {
    return this.prisma.beneficiary.update({
      where: { uuid },
      data: updateBeneficiaryDto,
    });
  }

  async remove(uuid: string): Promise<Beneficiary> {
    return this.prisma.beneficiary.delete({
      where: { uuid },
    });
  }
}
