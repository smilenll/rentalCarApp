import {ShowCarDTO} from "./show-car.dto";
import {Publish} from "../decorators/publish";

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
    public initialDate: string;

    @Publish()
    public expectedReturnDate: string;

    @Publish(ShowCarDTO)
    public car: ShowCarDTO;
}