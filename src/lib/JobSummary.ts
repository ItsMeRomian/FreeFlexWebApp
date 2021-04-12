import {JobInterface} from "@/lib/interfaces/job.interface";
import {CalculateJob} from "@/lib/CalculateJob";

export class JobSummary {
    private jobs: JobInterface[]

    constructor(jobs: JobInterface[]) {
        this.jobs = jobs
    }

    getTotals() {
        let hourly = 0,
            rating = 0,
            ratedJobs = 0,
            workedHours = 0,
            averageHourly = 0,
            averageRating = 0,
            BTW = 0,
            madeKMs = 0,
            madeMoney = 0,
            count = 0,
            workedClients: string[] = [],
            periods: string[] = []
        this.jobs.forEach((job) => {
            job.calculator = new CalculateJob(job)
            count += 1
            //Total worked hours
            workedHours += job.calculator.getWorkedHours()

            //Average hourly rate
            hourly += job.rate*1

            //Average rating
            if (job.rating) {
                rating += job.rating*1
                ratedJobs++
            }

            //Total made money
            madeMoney += job.calculator.getExclBTW()

            //Total BTW
            BTW += job.calculator.getBTW()

            //Total KM's driven
            madeKMs += job.distance

            //Sort clients by highest occurrence
            workedClients.push(job.clientName)

            //Sort periods by highest occurrence
            periods.push(job.period)
        })
        averageHourly = (hourly) / this.jobs.length
        averageRating = (rating) / ratedJobs
        return {
            count: count,
            mostFrequentClients: this.sortByFrequency(workedClients),
            mostFrequentPeriods: this.sortByFrequency(periods),
            workedHours: workedHours.toFixed(1),
            averageHourly: averageHourly.toFixed(2),
            madeMoney: madeMoney.toFixed(2),
            BTW: BTW.toFixed(2),
            madeKMs: madeKMs.toFixed(2),
            averageRating: averageRating.toFixed(2)
        }
    }
    sortByFrequency(letters: string[]){ //TODO: fix the any types
        const letterFrequencies = letters
            .reduce((freqs: any, letter) => {
                return Object
                    .assign(freqs, {
                        [letter]: (freqs[letter] || 0) + 1
                    });
            }, {});

        const letterFrequencyArr: any = Object
            .keys(letterFrequencies)
            .map(letter => ({ letter, frequency: letterFrequencies[letter] }));

        letterFrequencyArr.sort((a:any, b:any) => b.frequency - a.frequency || a.letter.localeCompare(b.letter));
        return letterFrequencyArr
    }
}