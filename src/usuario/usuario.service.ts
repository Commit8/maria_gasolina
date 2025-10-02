import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  // Buscar por nome de usuário
  async findByUsuario(usuario: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: { usuario },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: { email },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByEmail(usuario.email);

    if (buscaUsuario) {
      throw new HttpException('E-mail já cadastrado!', HttpStatus.BAD_REQUEST);
    }

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.findById(usuario.id);

    const buscaUsuario = await this.findByEmail(usuario.email);
    if (buscaUsuario && buscaUsuario.id !== usuario.id) {
      throw new HttpException('E-mail já cadastrado!', HttpStatus.BAD_REQUEST);
    }

    return await this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<void> {
    const usuario = await this.findById(id);
    await this.usuarioRepository.remove(usuario);
  }
}
