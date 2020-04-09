import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import {Model} from "./model.entity";

@Entity('carclasses')
export class CarClass {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', {length: 50})
    public name: string;

    @Column({ type: 'int', default: 0 })
    public price: number;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @OneToMany( type => Model, model => model.carClass)
    public models: Model[];
}
