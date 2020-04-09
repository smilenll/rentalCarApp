import {IsDateString, IsNotEmpty} from "class-validator";

export class ReturnCarDTO {
    @IsNotEmpty()
    @IsDateString()
    public returnDateTime: Date;
}