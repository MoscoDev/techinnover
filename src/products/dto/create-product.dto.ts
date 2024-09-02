import { IsString, IsNumber, IsInt, Min, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'The description of the product',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 19.99, description: 'The price of the product' })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiProperty({ example: 10, description: 'The quantity of the product' })
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({
    example: 'https://example.com/product-image.jpg',
    description: 'The URL of the product image',
  })
  @IsUrl()
  imageUrl: string;
}
