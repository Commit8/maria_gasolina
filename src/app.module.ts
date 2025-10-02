import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.modules';
import { Corrida } from './corrida/entities/corrida.entity';
import { CorridaModule } from './corrida/corrida.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: 'root',
      database: 'db_mariagasolina',
      entities: [Usuario, Corrida, Categoria],
      synchronize: true,
    }),
    UsuarioModule,
    CorridaModule,
    CategoriaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
