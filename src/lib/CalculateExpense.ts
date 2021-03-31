import {ExpenseInterface} from "@/lib/interfaces/expense.interface";
export class CalculateExpense {
    expense: any
    exclBTW: number | 0;
    BTW: number | 0;
    inclBTW: number | 0;
    constructor(expense: any) {
        this.expense = {
            amount: expense.amount,
            btwReduct: expense.btwReduct
        }
        console.log(this.expense)
        this.exclBTW = 0
        this.BTW = 0
        this.inclBTW = 0
        this.setInclBTW()
        this.setBTW()
        this.setExclBTW()
    }
    setExclBTW() {
        this.exclBTW = this.inclBTW - this.BTW
    }
    setBTW() {
        this.BTW = (this.expense.btwReduct / 100) * this.inclBTW
    }
    setInclBTW() {
        this.inclBTW = this.expense.amount*1
    }
    getExclBTW() {
        return this.exclBTW
    }
    getBTW() {
        return this.BTW
    }
    getInclBTW() {
        return this.inclBTW
    }
}