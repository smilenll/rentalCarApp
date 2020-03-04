import {ShowCarDTO} from "./show-car.dto";
import {Publish} from "../decorators/publish";
import {Car} from "../../database/entities/car.entity";

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
    public initialDate: string;

    @Publish()
    public expectedReturnDate: string;

    @Publish()
    public returnDateTime: string;

    @Publish(ShowCarDTO)
    public car: Car;
}