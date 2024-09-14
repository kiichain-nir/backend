import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateBeneficiaryDto {
  @ApiProperty({
    example: 'Beneficiary Name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    example: 'beneficiary@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'male',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    example: 30,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    example: 37.7749,
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    example: -122.4194,
  })
  @IsNumber()
  longitude: number;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  projectUUID: string;
}
