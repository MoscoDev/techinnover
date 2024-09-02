import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductStatus } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/pagination/page.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    userId: string,
  ): Promise<Product> {
    const product = this.productRepository.create({
      ...createProductDto,
      owner: { id: userId },
      status: ProductStatus.PENDING,
    });
    await this.productRepository.save(product);

    return product;
  }
  async getProducts(
    pageOptionsDto: PageOptionsDto,
    status?: ProductStatus,
    ownerUserId?: string,
  ): Promise<PageDto<Product>> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (status) {
      queryBuilder.andWhere('product.status = :status', {
        status: status,
      });
    }

    if (ownerUserId) {
      queryBuilder.andWhere('product.ownerId = :ownerUserId', { ownerUserId });
    }

    queryBuilder
      .orderBy('product.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const [items, itemCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(items, pageMetaDto);
  }

  async getApprovedProducts(
    pageOptionsDto: PageOptionsDto,
    userId?: string,
  ): Promise<PageDto<Product>> {
    return this.getProducts(pageOptionsDto, ProductStatus.APPROVED, userId);
  }

  async getUserProducts(
    pageOptionsDto: PageOptionsDto,
    userId: string,
  ): Promise<PageDto<Product>> {
    return this.getProducts(pageOptionsDto, undefined, userId);
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto | { status: ProductStatus },
    userId: string,
  ): Promise<Product> {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (product.owner.id !== userId) {
      throw new UnauthorizedException(
        `You don't have permission to update this product`,
      );
    }

    return this.productRepository.save(product);
  }

  async deleteProduct(id: string, userId: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (product.owner.id !== userId) {
      throw new ForbiddenException(
        `You don't have permission to delete this product`,
      );
    }
  }
}
