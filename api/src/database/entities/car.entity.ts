import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne, OneToMany,
} from 'typeorm';
import {CarClass} from "./car-class.entity";
import {Contract} from "./contracts.entity";

@Entity('cars')
export class Car {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', {length: 200})
    public model: string;

    @Column({ type: 'varchar', nullable: true })
    public img: string;

    @Column({ type: 'int', default: 0 })
    public allLikes: number;

    @Column({type: 'boolean', default: true})
    public isFree: boolean;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: number;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: number;

    @ManyToOne(type => CarClass, carClass => carClass.cars, { eager: true })
    public carClass: CarClass;

    @OneToMany( type => Contract, contracts => contracts.car)
    public contracts: Contract[];
}
