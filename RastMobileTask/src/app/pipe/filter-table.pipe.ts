import { Pipe, PipeTransform } from '@angular/core';
import { todoItem } from '../component/models/todoItem';

@Pipe({
  name: 'filterTable'
})
export class FilterTablePipe implements PipeTransform {

  transform(data:todoItem[] , binding:string): todoItem[] {

     binding = binding.toLowerCase();


     return binding? data.filter((m:todoItem ) =>m.socialMediaName.toLowerCase().indexOf(binding)!==-1):data;



  }

}
