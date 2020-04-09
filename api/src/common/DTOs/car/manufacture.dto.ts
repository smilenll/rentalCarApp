import {Publish} from "../../decorators/publish";

export class ShowManufactureDTO {

    @Publish()
    public id: number;

    @Publish()
    public name: string;
}