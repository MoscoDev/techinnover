export class ProductDto {
  id: string;
  name: string;
  price: number;
  description?: string;
  quantity: number;
  isApproved: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
