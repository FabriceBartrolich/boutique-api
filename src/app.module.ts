import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GenreModule } from './genre/genre.module';
import { ProductModule } from './product/product.module';
import { Genre } from './genre/entities/genre.entity';
import { Product } from './product/entities/product.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
     ConfigModule.forRoot({ envFilePath: ['.env'] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Genre, Product, User],
      synchronize: false,
    }),
    UserModule,
    GenreModule,
    ProductModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
