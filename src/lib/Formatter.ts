export class Formatter {
    money(value: number, sign="+"):string {

        //If you want te value to return negative
        if (sign === "+") sign = ""

        const rounded = (value*1).toFixed(2)
        if (Number.isInteger(Number(value))) {
            return "€"+sign+Math.floor(value)+".-"
        } else {
            return "€"+sign+rounded
        }

    }
    hours(value: number) {
        if (Number.isInteger(Number(value))) {
            return Number(value).toFixed(0)
        } else {
            return Number(value).toFixed(1)
        }
    }
    kilometers(value: number) {
        if (Number.isInteger(Number(value))) {
            return Number(value).toFixed(0)+"km"
        } else {
            return Number(value).toFixed(1)+"km"
        }
    }
}