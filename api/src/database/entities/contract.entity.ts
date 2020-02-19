import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne,
} from 'typeorm';
import {Length, Max, Min} from 'class-validator';
import {Car} from "./car.entity";

@Entity('contracts')
export class Contract {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar')
    @Length(3, 20)
    public firstName: string;

    @Column('varchar')
    @Length(3, 20)
    public lastName: string;

    @Column({ type: 'int' })
    @Min(3)
    @Max(80)
    public age: number;

    @Column({ type: 'int' })
    @Min(1)
    public days: number;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @Column({type: 'timestamp'})
    pickUpDateTime: string;

    @Column({type: 'timestamp', default: null})
    returnDateTime: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: number;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: number;

    @ManyToOne(type => Car, car => car.contracts, { eager: true })
    public car: Car;
}
