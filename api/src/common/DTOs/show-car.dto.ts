import {Publish} from "../decorators/publish";
import {ShowCarClassDTO} from "./car-class.dto";
import {Model} from "../../database/entities/model.entity";

export class ShowCarDTO {

    @Publish()
    public id: number;

    @Publish()
    public model: Model;

    @Publish()
    public img: string;

    @Publish()
    public isFree: boolean;


    @Publish(ShowCarClassDTO)
    public carClass: ShowCarClassDTO;
}