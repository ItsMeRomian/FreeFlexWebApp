import {JobInterface} from "@/lib/interfaces/job.interface";

export class CalculateJob {
    protected job: JobInterface;
    workedHours: number | 0;
    madeMoney: number | 0;
    BTW: number | 0;

    constructor(job: JobInterface) {
        this.job = {
            title: job.title,
            rate: job.rate,
            pauze: job.pauze,
            start: job.start,
            end: job.end,
            date: job.date,
            client: job.client,
            clientName: job.clientName,
            worker: job.worker,
            address: job.address,
            travel: job.travel,
            distance: job.distance,
            travelDistanceDouble: job.travelDistanceDouble,
            wayOfTravel: job.wayOfTravel,
            period: job.period
        }
        this.workedHours = 0
        this.madeMoney = 0
        this.BTW = 0
        this.setWorkedHours();
        this.setMadeMoney()
        this.setBTW()
    }
    setWorkedHours() {
        const start = this.timeToFloat(this.job.start);
        let end = this.timeToFloat(this.job.end);
        let pauze = this.timeToFloat(this.job.pauze);
        console.log(`${end} - ${pauze} - ${start}`)
        if (end < start) { end = end+24 }
        this.workedHours = end - pauze - start;
    }
    setMadeMoney() {
        this.madeMoney = this.getWorkedHours() * this.job.rate;
    }
    setBTW() {
        this.BTW = this.getMadeMoney() * 0.21;
    }
    getBTW() {
        return this.BTW;
    }
    getMadeMoney() {
        return this.madeMoney;
    }
    getWorkedHours() {
        return this.workedHours
    }
    timeToFloat(time: string) {
        const hoursMinutes = time.split(/[.:]/);
        const hours = parseInt(hoursMinutes[0], 10);
        const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return hours + minutes / 60;
    }
    formatTime() {
        return new Date(this.job.date)
    }
}