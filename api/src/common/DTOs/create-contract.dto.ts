import {
    IsString,
    IsNotEmpty,
    Length,
    IsNumber,
    IsDateString, Min
} from 'class-validator';

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

    @IsNotEmpty()
    @IsDateString()
    public initialDate: Date;

    @IsNotEmpty()
    @IsDateString()
    public expectedReturnDate: Date;
}