import {IsNotEmpty, IsNumber} from "class-validator";

export class ParamDTO {
    @IsNumber()
    @IsNotEmpty()
    public id: number;
}