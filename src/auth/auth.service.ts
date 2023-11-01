import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
        private jwtService: JwtService,
  ) {}
async register(createAuthDto: CreateAuthDto) {
    const { name, first_name, email, password } = createAuthDto;

		// hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

		// création d'une entité user
    const user = this.userRepository.create({
      name,
      first_name,
      email,
      password: hashedPassword,
    });

    try {
			// enregistrement de l'entité user
			const createdUser = await this.userRepository.save(user);
      delete createdUser.password;
      return createdUser;
    } catch (error) {
			// gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('L\'utilisateur existe déjà');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

async login (loginDto: LoginDto) {
  	const { email, password } = loginDto;
	const user = await this.userRepository.findOneBy({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = { email, sub: user.name };
    const name = user.name;
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken, name };
  } else {
    throw new UnauthorizedException(
      'Adresse emil ou mot de passe incorrects.',
    );
  }
}


  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }



  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
