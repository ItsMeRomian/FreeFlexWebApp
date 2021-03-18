export interface JobInterface {
    title: string,
    rate: number,
    pauze: string
    date: Date,
    start: string,
    end: string,
    client: string,
    worker: string,
    address: string,
    travel: boolean,
    distance: number,
    wayOfTravel: string,
    travelDistanceDouble: boolean
    //createdAt: any,
    //updatedAt: any,
}