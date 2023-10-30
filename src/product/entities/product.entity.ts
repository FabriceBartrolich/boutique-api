import { Genre } from 'src/genre/entities/genre.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => User, user => user.products, {eager: true})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Genre, genre => genre.products, {eager: true})
    @JoinColumn({ name: 'genre_id' })
    genre: Genre;
}