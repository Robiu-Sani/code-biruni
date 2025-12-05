export interface IPricing{
    name:string;
    title:string;
    amount:{
        prev:number;
        current:number;
    }
    amountType:'yearly' | 'monthly';
    services:{
        name:string;
        isProvied:boolean;
    }[]
    baseText:string;
}