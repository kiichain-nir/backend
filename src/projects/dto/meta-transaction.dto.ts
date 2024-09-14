import { ApiProperty } from '@nestjs/swagger';

export class MetaTransactionDto {
  @ApiProperty({
    example: 123,
  })
  gas: string;
  @ApiProperty({
    example: 123,
  })
  nonce: string;

  @ApiProperty({
    example: 123,
  })
  value: string;
}
