import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne,
} from 'typeorm';
import {Car} from "./car.entity";

@Entity('contracts')
export class Contract {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar')
    public firstName: string;

    @Column('varchar')
    public lastName: string;

    @Column({ type: 'int' })
    public age: number;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @Column({type: 'timestamp'})
    expectedReturnDate: string;

    @Column({type: 'timestamp', default: null})
    returnDateTime: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: number;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: number;

    @ManyToOne(type => Car, car => car.contracts, { eager: true })
    public car: Car;
}
