import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationsService {
  constructor() {}

  refreshResults({ page, pageSize, item } : { page: number, pageSize: number, item: any[] }) {
    return item
      .map((res, i) => ({ id: i + 1, ...res }))
      .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  }
}
