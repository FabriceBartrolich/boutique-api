import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>, 
  ) {}

  create(createProductDto: CreateProductDto) {
        const product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find();
  }

async findOne(id: number) {
    const found = await this.productRepository.findOne({ where: { id: id } });
    if (!found) {
        throw new NotFoundException(`Le produit avec l'id n°${id} n'existe pas.`);
    }
    return found;
}

async update(id: number, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.findOne({ where: { id: id } });
    if (!productToUpdate) {
      throw new NotFoundException(`Le produit avec l'id n°${id} n'existe pas.`);
    }
    Object.assign(productToUpdate, updateProductDto);
    return this.productRepository.save(productToUpdate);
}
      async remove(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Le produit avec l'id n°${id} n'existe pas.`);
    }
    return `Le produit avec l'id n°${id} a été supprimé avec succès.`;
  }
}
