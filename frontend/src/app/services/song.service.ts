import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  audioUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class SongService {
  private api = 'http://localhost:3000/api/songs';

  constructor(private http: HttpClient) {}

  getAll(q?: string): Observable<Song[]> {
  const options = q ? { params: { q } } : {};
  return this.http.get<Song[]>(this.api, options);
}

  create(song: Partial<Song>): Observable<Song> {
    return this.http.post<Song>(this.api, song);
  }

  update(id: string, changes: Partial<Song>): Observable<Song> {
    return this.http.put<Song>(`${this.api}/${id}`, changes);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.api}/${id}`);
  }
}
