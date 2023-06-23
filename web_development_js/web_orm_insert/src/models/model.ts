import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Livros {
    static createQueryBuilder(arg0: string) {
      throw new Error("Method not implemented.");
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    autor: string

    @Column()
    categoria: string;

    @Column()
    data: string;
}




