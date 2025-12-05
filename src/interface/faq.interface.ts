export interface IFaq{
    question:string;
    answer:{
        text:string;
        types?:string[];
    }
}