import {Publish} from "../../decorators/publish";

export class ShowAmortizationDTO {

    @Publish()
    public id: number;

    @Publish()
    public name: string;

    @Publish()
    public from: number;

    @Publish()
    public to: number;

    @Publish()
    public priceCoefficient:number;
}