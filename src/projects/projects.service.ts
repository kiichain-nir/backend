import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestContextService } from 'src/request-context/request-context.service';
import { UUID } from 'crypto';
import { executeMetaTxRequest } from 'src/utils/web3';
import { MetaTransactionDto } from './dto/meta-transaction.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private requestContextService: RequestContextService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const userWallet = this.requestContextService.getUserWalletAddress();

    const project = await this.prisma.project.create({
      data: {
        ...createProjectDto,
        budget: createProjectDto.tokenQuantity,
        userWallet,
      },
    });
    return project;
  }

  findAll() {
    const userWallet = this.requestContextService.getUserWalletAddress();

    return this.prisma.project.findMany({
      where: {
        userWallet,
      },
      include: {
        _count: true,
      },
    });
  }

  findOne(uuid: UUID) {
    return this.prisma.project.findFirstOrThrow({
      where: {
        uuid,
      },
      include: {
        _count: true,
      },
    });
  }

  update(uuid: UUID, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: {
        uuid,
      },
      data: updateProjectDto,
    });
  }

  remove(uuid: UUID) {
    return this.prisma.project.delete({
      where: {
        uuid,
      },
    });
  }

  executeMetaTransaction(payload: MetaTransactionDto) {
    return executeMetaTxRequest(payload);
  }
}
