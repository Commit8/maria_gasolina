import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorridaController } from './controllers/corrida.controller';
import { Corrida } from './entities/corrida.entity';
import { CorridaService } from './services/corrida.service';
import { CategoriaModule } from '../categoria/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([Corrida]), CategoriaModule],
  providers: [CorridaService],
  controllers: [CorridaController],
  exports: [CorridaService],
})
export class CorridaModule {}
