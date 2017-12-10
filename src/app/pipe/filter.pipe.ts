import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(collection, filter: string) {
    if (filter === '') {
      return collection;
    }
    const list = [];
    const lowercaseFilter =  filter.toLocaleLowerCase();
    for (const obj of collection) {
      const temp = obj.name.toLocaleLowerCase();
      if (temp.includes(lowercaseFilter)) {
        list.push(obj);
      }
    }
    return list;
  }
}
