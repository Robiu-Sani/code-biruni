export interface IProject{
    name:string;
    mainDomain:string;
    domains:string[];
    defaultDomains?:string[];
    githubLinks:string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hostService?:any;
    contacts:{
        name:string;
        method:string;
        way:string;
        numbers:string[];
    }[];
    hostDervice:{
        name:string;
        email:string;
        password:string;
    }[];
    domainService:{
        name:string;
        email:string;
        password:string;
    }[];
    address:string[];
    date:Date;
    providedServices:string;
    renualAmount:{
        service:string;
        amount:number;
    }[];
    positionPoient:number;
    images:string[];
    description:string;
    isDeleted:boolean;
    
}