import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_corridas' })
export class Corrida {
  //Atributos
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'int', nullable: false })
  distancia: number;

  @IsNotEmpty()
  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  valorCorrida: number;

  //Relacionamento entre as tabelas
  @ManyToOne(() => Usuario, (usuario) => usuario.corrida, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @ManyToOne(() => Categoria, (categoria) => categoria.corrida, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
