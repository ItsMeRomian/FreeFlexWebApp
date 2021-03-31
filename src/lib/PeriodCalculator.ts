export class PeriodCalculator {
    private readonly inputTime: number;

    private readonly year = new Date(this.inputTime).getFullYear()

    private readonly Q1Start: number;
    private readonly Q1End: number;

    private readonly Q2Start: number;
    private readonly Q2End: number;

    private readonly Q3Start: number;
    private readonly Q3End: number;

    private readonly Q4Start: number;
    private readonly Q4End: number;

    constructor(inputTime: string | Date) {
    this.inputTime = new Date(inputTime).getTime()
    this.year = new Date(this.inputTime).getFullYear()
    this.Q1Start = new Date(this.year + '-01-01').getTime();
    this.Q1End = new Date(this.year + '-03-31 23:59').getTime();
    this.Q2Start = new Date(this.year + '-04-01').getTime();
    this.Q2End = new Date(this.year + '-06-30 23:59').getTime();
    this.Q3Start = new Date(this.year + '-07-01').getTime();
    this.Q3End = new Date(this.year + '-09-30 23:59').getTime();
    this.Q4Start = new Date(this.year + '-10-01').getTime();
    this.Q4End = new Date(this.year + '-12-31 23:59').getTime();
    }

    today() {
        if (this.inputTime >= this.Q1Start && this.inputTime <= this.Q1End) {
            return this.year+"Q1"
        }
        else if (this.inputTime >= this.Q2Start && this.inputTime <= this.Q2End) {
            return this.year+"Q2"
        }
        else if (this.inputTime >= this.Q3Start && this.inputTime <= this.Q3End) {
            return this.year+"Q3"
        }
        else if (this.inputTime >= this.Q4Start && this.inputTime <= this.Q4End) {
            return this.year+"Q4"
        }
        else {
            console.log('idk welke periode man')
            return "a";
        }
    }
    previousPeriod(period: string) {
        const splittedValues = period.split('Q');
        if (splittedValues[1] === "1") {
            return (parseFloat(splittedValues[0])-1).toString() + "Q" + (parseFloat(splittedValues[1]) + 3).toString()

        } else {
            return splittedValues[0] + "Q" + (parseFloat(splittedValues[1])-1).toString()
        }
    }
    nextPeriod(period: string) {
        const splittedValues = period.split('Q');
        if (splittedValues[1] === "4") {
            return (parseFloat(splittedValues[0])+1).toString() + "Q" + (parseFloat(splittedValues[1]) - 3).toString()

        } else {
            return splittedValues[0] + "Q" + (parseFloat(splittedValues[1])+1).toString()
        }
    }

}