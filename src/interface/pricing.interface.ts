export interface IPricing{
    name:string;
    title:string;
    amount:{
        prev:number;
        current:number;
        yearly:number;
    }
    amountType:'yearly' | 'monthly';
    services:{
        name:string;
        isProvied:boolean;
    }[]
    baseText:string;
}