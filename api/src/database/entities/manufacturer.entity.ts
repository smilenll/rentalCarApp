import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import {Model} from "./model.entity";

@Entity('manufacturers')
export class Manufacturer {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', {length: 50, unique: true})
    public name: string;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @OneToMany( type => Model, model => model.manufacture)
    public models: Model[];
}
