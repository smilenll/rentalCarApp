import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany, ManyToOne,
} from 'typeorm';
import {Car} from "./car.entity";
import {Manufacturer} from "./manufacturer.entity";

@Entity('models')
export class Model {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', {length: 50})
    public name: string;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @OneToMany( type => Car, car => car.model)
    public cars: Car[];

    @ManyToOne(type => Manufacturer, manufacture => manufacture.models, { eager: true })
    public manufacture: Manufacturer;
}
