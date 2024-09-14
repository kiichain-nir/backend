import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';

@Controller('vendors')
@ApiTags('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(createVendorDto);
  }

  @Get()
  findAll(@Query() queries: any) {
    return this.vendorsService.findAll(queries);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: UUID) {
    return this.vendorsService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: UUID, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorsService.update(uuid, updateVendorDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: UUID) {
    return this.vendorsService.remove(uuid);
  }
}
