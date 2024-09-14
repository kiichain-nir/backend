import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsJSON, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVendorDto {
  @ApiProperty({
    example: 'Vendor Name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '0x1234567890abcdef1234567890abcdef12345678',
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    example: { city: 'San Francisco', state: 'CA' },
    required: false,
  })
  @IsOptional()
  @IsObject()
  extras?: string;

  @ApiProperty({
    example: 'vendor@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  projectUUID: string;
}
