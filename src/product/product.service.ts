import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
    constructor(

    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>, 
  ) {}
async create(createProductDto: CreateProductDto):Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    
    return this.productRepository.save(newProduct);
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

async update(id: any, updateProductDto: UpdateProductDto) {
  // console.log("Test", id);
  
    const productToUpdate = await this.productRepository.findOne({ where: { id: parseInt(id,10) } });
    if (!productToUpdate) {
      throw new NotFoundException(`Le produit avec l'id n°${id} n'existe pas.`);
    }
    console.log("Test", productToUpdate);
    Object.assign(productToUpdate, updateProductDto);
    return this.productRepository.save(productToUpdate);
}
      async remove(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Le produit avec l'id n°${id} n'existe pas.`);
    }
    return result ;
  }
}
