export interface challenge{
    createdBy:number;
    desc:string;
    employeeId:string;
    tags:Tags[];
    time:number;
    title:string;
    upvoteBy:Array<number>;
}

export interface Tags{
    name:string;
}