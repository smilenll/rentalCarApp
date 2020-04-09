import {Publish} from "../../decorators/publish";
import {ShowCarClassDTO} from "./car-class.dto";
import {ShowManufactureDTO} from "./manufacture.dto";
import {CarClass} from "../../../database/entities/car-class.entity";

export class ShowModelDTO {

    @Publish()
    public id: number;

    @Publish()
    public name: string;

    @Publish(ShowCarClassDTO)
    public carClass: CarClass;

    @Publish(ShowManufactureDTO)
    public manufacture: ShowManufactureDTO;
}