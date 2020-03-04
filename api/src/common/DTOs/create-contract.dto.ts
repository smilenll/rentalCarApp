import {
    IsString,
    IsNotEmpty,
    Length,
    IsNumber,
    IsDateString
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
    public age: number;

    @IsNotEmpty()
    @IsDateString()
    public initialDate: Date;

    @IsNotEmpty()
    @IsDateString()
    public expectedReturnDate: Date;
}