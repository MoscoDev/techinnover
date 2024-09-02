import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUnbanUserDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ban status of the user',
    example: true,
  })
  banStatus: boolean;
}

export class BanUnbanUserParam {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the user to ban or unban',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}
