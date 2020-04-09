import {Publish} from "../../decorators/publish";
import {ShowModelDTO} from "./model.dto";
import {Model} from "../../../database/entities/model.entity";

export class ShowCarDTO {

    @Publish()
    public id: number;

    @Publish(ShowModelDTO)
    public model: ShowModelDTO;

    @Publish()
    public img: string;

    @Publish()
    public yearOfManufacture: number;
}