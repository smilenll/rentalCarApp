import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne, OneToMany,
} from 'typeorm';
import {CarClass} from "./car-class.entity";
import {Contract} from "./contract.entity";
import {Model} from "./model.entity";

@Entity('cars')
export class Car {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', {length: 200})
    public modelOld: string;

    @Column({ type: 'varchar', nullable: true })
    public img: string;

    @Column({type: 'boolean', default: true})
    public isFree: boolean;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @Column({type: 'boolean', nullable: true})
    yearOfManufacture: number;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

    @ManyToOne(type => CarClass, carClass => carClass.cars, { eager: true })
    public carClass: CarClass;

    @OneToMany( type => Contract, contracts => contracts.car)
    public contracts: Contract[];

    @ManyToOne(type => Model, model => model.cars, { eager: true })
    public model: Model;

    //toggleStatus
}
