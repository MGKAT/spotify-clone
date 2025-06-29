import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './song.service';
import { Playlist } from './playlist.service';

export interface User {
  _id: string;
  username: string;
  email: string;
  favoriteSongs: Song[];
  playlists: Playlist[];
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  signup(payload: { username: string; email: string; password: string }): Observable<{ id: string; username: string; email: string }> {
    return this.http.post<{ id: string; username: string; email: string }>(this.api, payload);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  toggleFavorite(userId: string, songId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/${userId}/favorites/${songId}`);
  }
}
