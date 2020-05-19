import { ValidationError } from "../exeptions/validation.error"
import { NotFoundError } from "../exeptions/not-found.error"

const should = (rule: boolean, message = "Invalid rule")  => {
    if(!rule) {
        throw new ValidationError(message)
    }
}

const exists = (obj: any, message = "Object not found") => {
    if (!obj) {
        throw new NotFoundError(message);
    }
}

const isValidPeriod = (from: Date, to: Date, message = "Invalid period") => {
    const differenceInTime = new Date(to).getTime() - new Date(from).getTime();
    if(differenceInTime < 0) {
        throw new ValidationError(message);
    }
}

const isDateCloseToNow = (date: Date, minutesBuffer: number, massage = "Invalid period") => {
    const now = new Date().getTime();
    const initialDateTime = new Date(date).getTime();
    const differenceInTime = now - initialDateTime;
    if(differenceInTime > (minutesBuffer * 60000)){
        throw new ValidationError(massage);
    }
}

// const isWithinPeriod = (input: { from: Date, to: Date, value: Date }, message = "Is within period") => {
//
//     console.log(input.from)
//     if(differenceInTime < 0) {
//         throw new ValidationError('Invalid date');
//     }
//     if(differenceInTime > tenMinutes) {
//         throw new ValidationError('Invalid date');
//     }
//
//     isValidPeriod(input.from, input.to, message);
// }

export default {
    should,
    exists,
    isValidPeriod,
    isDateCloseToNow
}