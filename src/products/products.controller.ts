import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PageOptionsDto } from 'src/pagination/page.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Roles, RolesGuard } from 'src/auth/role.guard';
import { UserRole } from 'src/users/dto/user-profile.dto';
import { AuthGuard, Public } from 'src/auth/auth.guards';
import { ProductStatus } from './product.entity';

@ApiTags('products')
// @UseGuards(LocalAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all approved products' })
  @ApiResponse({
    status: 200,
    description: 'The products have been successfully retrieved.',
  })
  async getAllApprovedProducts(@Query() pageOptionsDto: PageOptionsDto) {
    return await this.productsService.getApprovedProducts(pageOptionsDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createProductDto: CreateProductDto, @Req() req: any) {
    return await this.productsService.createProduct(
      createProductDto,
      req.user.userId,
    );
  }

  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Get('my')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products for the current user' })
  @ApiResponse({
    status: 200,
    description: 'The products have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getMyProducts(
    @Query() pageOptionsDto: PageOptionsDto,
    @Req() req: any,
  ) {
    return await this.productsService.getProducts(
      pageOptionsDto,
      undefined,
      req.user.userId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async getProduct(
    @Param('id') id: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    return await this.productsService.getApprovedProducts(pageOptionsDto, id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: any,
  ) {
    return await this.productsService.updateProduct(
      id,
      updateProductDto,
      req.user.userId,
    );
  }

  @Patch(':id/product-status')
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product status' })
  @ApiResponse({
    status: 200,
    description: 'The product status has been successfully updated.',
  })
  @ApiBody({
    schema: {
      example: {
        status: ProductStatus.APPROVED,
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async updateProductApprovalStatus(
    @Param('id') id: string,
    @Body() body: { status: ProductStatus },
  ) {
    return await this.productsService.updateProduct(
      id,
      { status: body.status },
      'admin',
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async deleteProduct(@Param('id') id: string, @Req() req: any) {
    return await this.productsService.deleteProduct(id, req.user.userId);
  }
}
