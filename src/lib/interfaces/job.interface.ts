import {CalculateJob} from "@/lib/CalculateJob";

export interface JobInterface {
    double: boolean;
    calculator?: CalculateJob;
    title: string,
    rate: number,
    pauze: string
    date: {
        seconds: number,
        nanoseconds: number,
    },
    start: string,
    end: string,
    client: string,
    clientName: string
    worker: string,
    address: string,
    travel: boolean,
    distance: number,
    wayOfTravel: string,
    period: string,
    factoring: boolean,
    factoringPercentage: number,
    isCheckedOut: boolean,
    isPayed: boolean,
    daysToPay: number,
    rating: number,
    //createdAt: any,
    //updatedAt: any,
}