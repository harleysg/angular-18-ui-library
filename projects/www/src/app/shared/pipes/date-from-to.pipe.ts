import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

type MonthTypes = 'MMM' | 'MMMM'

@Pipe({
  name: 'dateFromTo',
  standalone: true
})
export class DateFromToPipe implements PipeTransform {
  private datePipe = inject(DatePipe)

  transform(from: any, to: any, options?: { month: MonthTypes }): string {
    let _from, _to, year, month = 'MMM'

    if (!from || !to) return ''

    if (options?.month) {
      month = options?.month
    }

    from = new Date(from.replace(/-/g, '\/'))
    to = new Date(to.replace(/-/g, '\/'))

    if (from.getFullYear() !== to.getFullYear()) {
      _from = this.datePipe.transform(from, `${month} d, yyyy`)
      _to = this.datePipe.transform(to, `${month} d, yyyy`)
    } else if (from.getMonth() !== to.getMonth()) {
      _from = this.datePipe.transform(from, `${month} d`)
      _to = this.datePipe.transform(to, `${month} d`)
      year = this.datePipe.transform(to, 'yyyy')
    } else {
      _from = this.datePipe.transform(from, `${month} d`)
      _to = this.datePipe.transform(to, 'd')
      year = this.datePipe.transform(to, 'yyyy')
    }

    return this.concat(_from, _to, year);
  }

  private concat(from: any, to: any, year?: any) {
    year = year ? `, ${year}` : ''

    return `${from} - ${to}${year}`.trim()
  }

}
