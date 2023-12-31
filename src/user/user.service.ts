import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);
    return user;
  }
  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const found = await this.userRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`L'utilisateur avec l'id n°${id} n'existe pas`);
    }
    return found;
  }

async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOne({ where: { id: id } });
        if (!userToUpdate) {
      throw new NotFoundException(`L'utilisateur avec l'id n°${id} n'existe pas`);
    }
    Object.assign(userToUpdate, updateUserDto);
    return this.userRepository.save(userToUpdate);
}

    async remove(id: number) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`L'utilisateur avec l'id n°${id} n'existe pas.`);
    }
    return `L'utilisateur avec l'id n°${id} a été supprimé avec succès.`;
  }
}
