import { Pipe, PipeTransform } from "@angular/core";
import Utils from "../utils/string.utils";

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(time: number): string {
    return Utils.convertNumberToTimeString(time)
  }
}