import {JobInterface} from "@/lib/interfaces/job.interface";

export class JobSummary {
    private jobs: JobInterface[]

    constructor(jobs: JobInterface[]) {
        this.jobs = jobs
    }

    getTotals() {
        let hourly = 0
        let workedHours = 0,
            averageHourly = 0,
            BTW = 0,
            madeKMs = 0,
            madeMoney = 0,
            count = 0;
        this.jobs.forEach((job) => {
            count += 1
            //Total worked hours
            console.log(madeMoney)
            workedHours += job.calculator.getWorkedHours()

            //Average hourly rate
            hourly += job.rate*1
            averageHourly = (hourly) / this.jobs.length

            //Total made money
            madeMoney += job.calculator.getExclBTW()

            //Total BTW
            BTW += job.calculator.getBTW()

            //Total KM's driven
            madeKMs += job.distance

            //Sort clients by highest occurrence
            //totals.workedClients.push(job.clientName)
        })
        //totals.workedClients.forEach((x: string | number) => { totals.mostWorked[x] = (totals.mostWorked[x] || 0)+1; }); TODO: Fix
        console.log(madeMoney)
        return {
            count: count,
            workedHours: workedHours.toFixed(2),
            averageHourly: averageHourly.toFixed(2),
            madeMoney: madeMoney.toFixed(2),
            BTW: BTW.toFixed(2),
            madeKMs: madeKMs.toFixed(2),
        }
    }
}