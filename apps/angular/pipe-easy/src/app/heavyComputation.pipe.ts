import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(value: string, index: number): unknown {
    return `${value} - ${index}`;
  }
}
