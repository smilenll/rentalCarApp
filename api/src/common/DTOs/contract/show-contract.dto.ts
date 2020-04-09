import {ShowCarDTO} from "../car/show-car.dto";
import {Publish} from "../../decorators/publish";

export class ShowContractDTO {

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

    @Publish(ShowCarDTO)
    public car: ShowCarDTO;
}