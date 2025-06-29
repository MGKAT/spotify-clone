import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from './song.service';

export interface Playlist {
  _id: string;
  name: string;
  owner: string;
  songs: Song[];
}

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private api = 'http://localhost:3000/api/playlists';

  constructor(private http: HttpClient) {}

 getAll(owner?: string): Observable<Playlist[]> {
  const options = owner ? { params: { owner } } : {};
  return this.http.get<Playlist[]>(this.api, options);
}


  create(payload: Partial<Playlist>): Observable<Playlist> {
    return this.http.post<Playlist>(this.api, payload);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.api}/${id}`);
  }

  addSongToPlaylist(playlistId: string, songId: string) {
  return this.http.put(`http://localhost:3000/api/playlists/${playlistId}`, {
    songId
  });
}

}
