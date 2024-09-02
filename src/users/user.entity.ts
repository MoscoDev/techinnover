import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './dto/user-profile.dto';
import { Product } from 'src/products/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Column({ unique: false })
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: Boolean, default: false })
  @ApiProperty({ example: true })
  isBanned: boolean;

  @OneToMany(() => Product, (product) => product.owner)
  products: Product[];

  @ApiProperty({ example: 'user', enum: [UserRole.USER, UserRole.ADMIN] })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole.USER | UserRole.ADMIN;
}
