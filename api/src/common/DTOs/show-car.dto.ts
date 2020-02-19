import {Publish} from "../decorators/publish";
import {ShowCarClassDTO} from "./car-class.dto";

export class ShowCarDTO {

    @Publish()
    public id: number;

    @Publish()
    public model: string;

    @Publish()
    public img: string;

    @Publish()
    public age: number;

    @Publish()
    public isFree: boolean;

    @Publish()
    public pickUpDateTime: number;

    @Publish()
    public returnDateTime: number;

    @Publish(ShowCarClassDTO)
    public carClass: ShowCarClassDTO;
}