import {
    IsString,
    IsNotEmpty,
    Length,
    IsNumber,
    IsDateString, Min
} from 'class-validator';
import {Publish} from "../../decorators/publish";

export class ShowAmortizationDTO {

    @Publish()
    public id: string;

    @Publish()
    public name: string;

    @Publish()
    public from: number;

    @Publish()
    public to: number;
}