import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsUrl,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 10.99,
    description: 'The price of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({
    example: 'This is a product description',
    description: 'The description of the product',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'The quantity of the product',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @ApiProperty({
    example: 'https://example.com/product-image.jpg',
    description: 'The URL of the product image',
    required: false,
  })
  @IsUrl()
  imageUrl: string;
}
