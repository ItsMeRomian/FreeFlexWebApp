import {JobInterface} from "@/lib/interfaces/job.interface";
const moment = require('moment');
export class CalculateJob {
    protected job: JobInterface;
    workedHours: number | 0;
    //Job Money
    exclBTW: number | 0;
    BTW: number | 0;
    inclBTW: number | 0;

    //Factoring Money
    factoringExclBTW: number | 0;
    factoringBTW: number | 0;
    factoringInclBTW: number |0;

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
            period: job.period,
            factoring: job.factoring,
            factoringPercentage: job.factoringPercentage,
            isCheckedOut: job.isCheckedOut,
            isPayed: job.isPayed,
            daysToPay: job.daysToPay
        }
        this.workedHours = 0
        this.setWorkedHours();

        this.exclBTW = 0
        this.BTW = 0
        this.inclBTW = 0
        this.setExclBTW()
        this.setBTW()
        this.setInclBtw()

        this.factoringBTW = 0
        this.factoringExclBTW = 0
        this.factoringInclBTW = 0

        if (this.isFactoring()) {
            this.setFactoringExclBTW()
            this.setFactoringBTW()
            this.setFactoringInclBTW()
        }
    }
    setWorkedHours() {
        const start = this.timeToFloat(this.job.start);
        let end = this.timeToFloat(this.job.end);
        let pauze = this.timeToFloat(this.job.pauze);
        if (end < start) { end = end+24 }
        this.workedHours = end - pauze - start;
    }
    //Setters: Job Money
    setExclBTW() {
        this.exclBTW = this.getWorkedHours() * this.job.rate;
    }
    setBTW() {
        this.BTW = this.getExclBTW() * 0.21;
    }
    setInclBtw() {
        this.inclBTW = this.getExclBTW() + this.getBTW()
    }

    //Setters: Factoring Money
    setFactoringExclBTW() {
        this.factoringExclBTW = this.getInclBTW() * (this.job.factoringPercentage / 100)
    }
    setFactoringBTW() {
        this.factoringBTW = this.factoringExclBTW * 0.21
    }
    setFactoringInclBTW() {
        this.factoringInclBTW = this.factoringExclBTW + this.factoringBTW
    }

    //Getters: Job Money
    getBTW() {
        return this.BTW;
    }
    getExclBTW() {
        return this.exclBTW;
    }
    getInclBTW(): number {
        return this.inclBTW
    }
    isFactoring(): boolean {
        return this.job.factoring;
    }
    //Getters: FactoringMoney
    getFactoringExclBTW() {
        return this.factoringExclBTW
    }
    getFactoringBTW() {
        return this.factoringBTW
    }
    getFactoringInclBTW() {
        return this.factoringInclBTW
    }

    //Getters: Subtotal
    getSubExclBTW() {
        return this.exclBTW - this.factoringExclBTW
    }
    getSubBTW() {
        return this.BTW - this.factoringBTW
    }
    getSubInclBTW() {
        return this.inclBTW - this.factoringInclBTW
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
        // @ts-ignore
        return moment(new Date(this.job.date))
    }
    isJobInPast() {
        return new Date(this.formatTime()) < new Date();
    }
    getJobStatus() {
        //1: Job worked checked out and payed
        //2: job worked checked out but not payed
        //3: job worked but not checked out
        //4: job not worked
        //0 invalid state
        if (this.isJobInPast()) {
            if (this.job.isCheckedOut) {
                if (this.job.isPayed) {
                    return 1
                } else {
                    return 2
                }
            } else {
                return 3
            }
        } else if (this.job.isPayed || this.job.isCheckedOut) {
            return 0
        } else {
            return 4
        }
    }
}