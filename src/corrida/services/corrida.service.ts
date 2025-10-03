import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Corrida } from '../entities/corrida.entity';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { CategoriaService } from '../../categoria/services/categoria.service';

@Injectable()
export class CorridaService {
  constructor(
    @InjectRepository(Corrida)
    private corridaRepository: Repository<Corrida>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Corrida[]> {
    return this.corridaRepository.find({
      relations: { categoria: true, usuario: true },
    });
  }

  async findById(id: number): Promise<Corrida> {
    const corrida = await this.corridaRepository.findOne({
      where: { id },
      relations: { categoria: true, usuario: true },
    });
    if (!corrida) {
      throw new HttpException('Corrida não encontrada', HttpStatus.NOT_FOUND);
    }
    return corrida;
  }

  async create(corrida: Corrida): Promise<Corrida> {
    await this.categoriaService.findById(corrida.categoria.id);
    corrida.valorCorrida = await this.calcularValorCorrida(
      corrida.distancia,
      corrida.categoria.id,
    );
    corrida.valorCorrida = Number(corrida.valorCorrida.toFixed(2));

    return this.corridaRepository.save(corrida);
  }

  async update(corrida: Corrida): Promise<Corrida> {
    await this.findById(corrida.id);
    await this.categoriaService.findById(corrida.categoria.id);
    return this.corridaRepository.save(corrida);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.corridaRepository.delete(id);
  }

  async calcularValorCorrida(
    distancia: number,
    categoriaId: number,
  ): Promise<number> {
    const categoria = await this.categoriaService.findById(categoriaId);
    const valorCorrida = distancia * categoria.preco;
    return valorCorrida;
  }
}
