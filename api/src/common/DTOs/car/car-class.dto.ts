import {Publish} from "../../decorators/publish";

export class ShowCarClassDTO {

    @Publish()
    public id: number;

    @Publish()
    public name: string;

    @Publish()
    public price: number;
}