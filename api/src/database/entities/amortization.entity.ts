import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';

@Entity('amortizations')
export class Amortization {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', {length: 50, unique: true})
    public name: string;

    @Column({ type: 'int', default: 0 })
    public from: number;

    @Column({ type: 'int', default: 0 })
    public to: number;

    @Column({ type: 'float', nullable: true })
    public priceCoefficient: number;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;
}
