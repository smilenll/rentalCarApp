import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import {Car} from "./car.entity";
import {Max} from "class-validator";

@Entity('carclasses')
export class CarClass {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', {length: 50})
    public name: string;

    @Column({ type: 'int', default: 0 })
    @Max(1000)
    public price: number;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @OneToMany( type => Car, car => car.carClass)
    public cars: Car[];
}
