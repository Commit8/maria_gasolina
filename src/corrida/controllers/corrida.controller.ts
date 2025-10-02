import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Corrida } from '../entities/corrida.entity';

@Controller('/corridas')
export class CorridaController {
  constructor(private readonly corridaService: CorridaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Corrida[]> {
    return this.corridaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Corrida> {
    return this.corridaService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() corrida: Corrida): Promise<Corrida> {
    return this.corridaService.create(corrida);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() corrida: Corrida): Promise<Corrida> {
    return this.corridaService.update(corrida);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.corridaService.delete(id);
  }
}
