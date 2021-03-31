export interface JobInterface {
    calculator?: any;
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
    travelDistanceDouble: boolean,
    period: string,
    factoring: boolean,
    factoringPercentage: number
    //createdAt: any,
    //updatedAt: any,
}