import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('beneficiaries')
@ApiTags('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  @Post()
  create(@Body() createBeneficiaryDto: CreateBeneficiaryDto) {
    return this.beneficiariesService.create(createBeneficiaryDto);
  }

  @Get()
  findAll(@Query() queries: any) {
    return this.beneficiariesService.findAll(queries);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.beneficiariesService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateBeneficiaryDto: UpdateBeneficiaryDto) {
    return this.beneficiariesService.update(uuid, updateBeneficiaryDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.beneficiariesService.remove(uuid);
  }
}
