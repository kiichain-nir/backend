import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Prisma, Vendor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginate } from 'src/utils/paginate';
import { MailService } from 'src/mailer/mailer.service';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService, private mailService: MailService) {}

  async create(createVendorDto: CreateVendorDto) {
    const { projectUUID, ...rest } = createVendorDto;

    const res = await this.prisma.vendor.create({
      data: {
        project: {
          connect: {
            uuid: projectUUID,
          },
        },
        ...rest,
      },
    });

    if (res)
      this.mailService.sendURLMail({
        email: rest.email,
        url: `${process.env.FRONTEND_URL}/community-managers/${res.uuid}`,
      });

    return res;
  }

  async findAll(queries: any) {
    const where: Prisma.VendorWhereInput = {};
    const select: Prisma.VendorSelect = {
      uuid: true,
      name: true,
      email: true,
      extras: true,
      walletAddress: true,
      createdAt: true,
      updatedAt: true,
      id: true,
    };

    if (queries?.projectUUID) {
      where.project = {
        uuid: queries.projectUUID,
      };
    }

    return paginate(
      this.prisma.vendor,
      {
        where,
        orderBy: {
          createdAt: 'desc',
        },
        select,
      },
      {
        page: queries.page,
        perPage: queries.perPage,
      },
    );
  }

  async findOne(uuid: string) {
    const ven = await this.prisma.vendor.findFirst({
      where: { uuid },
      include: {
        project: {},
      },
    });
    return ven;
  }

  async update(uuid: string, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
    return this.prisma.vendor.update({
      where: { uuid },
      data: updateVendorDto,
    });
  }

  async remove(uuid: string): Promise<Vendor> {
    return this.prisma.vendor.delete({
      where: { uuid },
    });
  }
}
