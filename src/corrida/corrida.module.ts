import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorridaController } from './controllers/corrida.controller';
import { Corrida } from './entities/corrida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Corrida]), CorridaModule],
  providers: [CorridaService],
  controllers: [CorridaController],
  exports: [],
})
export class CorridaModule {}