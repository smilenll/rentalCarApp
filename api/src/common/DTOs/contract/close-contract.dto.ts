import {ShowCarDTO} from "../car/show-car.dto";
import {Publish} from "../../decorators/publish";
import {Car} from "../../../database/entities/car.entity";

export class CloseContractDTO {

    @Publish()
    public id: number;

    @Publish()
    public firstName: string;

    @Publish()
    public lastName: string;

    @Publish()
    public age: number;

    @Publish()
    public initialDateTime: Date;

    @Publish()
    public expectedReturnDateTime: Date;

    @Publish()
    public returnDateTime: Date;

    @Publish(ShowCarDTO)
    public car: Car;
}