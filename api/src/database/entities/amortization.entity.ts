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

    @Column('varchar', {length: 50})
    public name: string;

    @Column({ type: 'int', default: 0 })
    public from: number;

    @Column({ type: 'int', default: 0 })
    public to: number;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;
}
