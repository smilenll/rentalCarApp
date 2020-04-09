import {
    IsString,
    IsNotEmpty,
    Length,
    IsNumber,
} from 'class-validator';

export class CreateAmortizationDTO {

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    public name: string;

    @IsNumber()
    @IsNotEmpty()
    public from: number;

    @IsNumber()
    @IsNotEmpty()
    public to: number;
}