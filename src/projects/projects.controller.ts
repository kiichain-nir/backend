import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { MetaTransactionDto } from './dto/meta-transaction.dto';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: UUID) {
    return this.projectsService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: UUID, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(uuid, updateProjectDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: UUID) {
    return this.projectsService.remove(uuid);
  }

  @Post('execute-meta-transaction')
  executeMetaTransaction(@Body() payload: MetaTransactionDto) {
    return this.projectsService.executeMetaTransaction(payload);
  }
}
