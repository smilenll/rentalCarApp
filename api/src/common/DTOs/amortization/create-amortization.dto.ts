import {
    IsString,
    IsNotEmpty,
    Length,
    IsNumber, IsNumberString,
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

    @IsNumber()
    @IsNotEmpty()
    public priceCoefficient: number;
}