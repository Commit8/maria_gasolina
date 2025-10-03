import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Corrida } from '../../corrida/entities/corrida.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  veiculo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  taxaGasolina: number;

  @OneToMany(() => Corrida, (corrida) => corrida.categoria)
  corrida: Corrida[];
}
