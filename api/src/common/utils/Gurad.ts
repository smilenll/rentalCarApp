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
  
  const differenceInTime = to.getTime() - from.getTime();

  if(differenceInTime < 0) {
    throw new ValidationError(message);
  }  
}

const isWithinPeriod = (input: { from: Date, to: Date, value: Date }, message = "Is within period") => {
  isValidPeriod(input.from, input.to, message);

  isValidPeriod(input.from, input.value, message);

  isValidPeriod(input.value, input.to, message);  
}

export default {
  should,
  exists,
  isValidPeriod,
  isWithinPeriod
}