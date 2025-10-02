import { TypeOrmModule } from '@nestjs/typeorm';
import Module from 'module';
import { CategoriaController } from '../../../maria_gasolina/src/categoria/controllers/categoria.controller';
import { Categoria } from '../../../maria_gasolina/src/categoria/entities/categoria.entity';
import { CategoriaService } from '../../../maria_gasolina/src/categoria/services/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [CategoriaService],
})
export class CategoriaModule {}
