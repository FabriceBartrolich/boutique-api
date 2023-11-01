import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
@UseGuards(AuthGuard('jwt')) 
  create(@Body() createProductDto: CreateProductDto) {
  
  return this.productService.create(createProductDto);
}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt')) 
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt')) 
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    console.log("Test", id);
    
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt')) 
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
