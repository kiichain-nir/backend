import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Project 5',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Token Name',
  })
  @IsString()
  tokenName: string;

  @ApiProperty({
    example: 1000000.0,
  })
  @IsNumber()
  tokenQuantity: number;

  @ApiProperty({
    example: 'TKN',
  })
  @IsString()
  tokenSymbol: string;

  @ApiProperty({
    example: 'Real Estate Property',
  })
  @IsString()
  rwaRepresentation: string;

  @ApiProperty({
    example: 'This is a project description.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsString()
  txHash: string;

  @ApiProperty({
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsOptional()
  @IsString()
  contractAddress: string;

  @ApiProperty({
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s',
  })
  @IsString()
  @IsOptional()
  imageUrl: string;
}
