import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Car {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column('varchar', {length: 200})
    public title: string;

    @Column('varchar', {length: 2000})
    public description: string;

    @Column({ type: 'varchar', nullable: true })
    public img: string;

    @Column({ type: 'int', default: 0 })
    public allLikes: number;

    @Column({type: 'boolean', default: true})
    public isPublic: boolean;

    @Column({type: 'boolean', default: false})
    public isDeleted: boolean;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: number;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: number;
}
