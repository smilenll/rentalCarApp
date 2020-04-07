import { IsNumberString } from 'class-validator';

export class ParamDTO {
    @IsNumberString()
    id: number;
}
