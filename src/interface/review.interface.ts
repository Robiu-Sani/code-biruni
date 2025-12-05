import { ObjectId } from "mongoose";

export interface IReview{
    projectName:string;
    name:string;
    position:string;
    description:string;
    domain:string;
    image:string;
    project?:ObjectId;
}