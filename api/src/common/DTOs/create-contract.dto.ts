import {
    IsString,
    IsNotEmpty,
    Length,
    IsNumber,
    IsDateString, Min
} from 'class-validator';
import {Car} from "../../database/entities/car.entity";

export class CreateContractDTO {

    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    public firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    public lastName: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(18)
    public age: number;

    @IsNumber()
    @IsNotEmpty()
    public car: number;

    @IsNotEmpty()
    @IsDateString()
    public initialDate: Date;

    @IsNotEmpty()
    @IsDateString()
    public expectedReturnDate: Date;
}