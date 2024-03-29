import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver-es';
import { map, tap } from 'rxjs/operators';

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' })
    .pipe(
      tap(content => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    )
  }

  uploadFile(file: Blob, url: string) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<File>(url, formData);
  }
}
