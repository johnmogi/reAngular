import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlbumModel } from 'src/models/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  public myApi = 'http://localhost:4000/api/';
  constructor(private http: HttpClient) { }
  public getAllAlbums(): Observable<AlbumModel[]> {
    return this.http.get<AlbumModel[]>(this.myApi + "albums");
  }
}
