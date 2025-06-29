import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService, Song } from '../../services/song.service';
import { AudioService } from '../../services/audio.service';
import { UserService } from '../../services/user.service';
import { PlaylistService, Playlist } from '../../services/playlist.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.css'
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  playlists: Playlist[] = [];
  selectedPlaylist: { [songId: string]: string } = {};
  userId = '666666666666666666666666';

  constructor(
    private songService: SongService,
    private audioService: AudioService,
    private userService: UserService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit() {
    this.songService.getAll().subscribe((res) => this.songs = res);
    this.playlistService.getAll(this.userId).subscribe(p => this.playlists = p);
  }

  playSong(song: Song) {
    if (!song.audioUrl) return;
    this.audioService.load(song.audioUrl).then(() => this.audioService.play());
  }

  toggleFavorite(song: Song) {
    this.userService.toggleFavorite(this.userId, song._id).subscribe((favorites) => {
      console.log('Favoris mis à jour :', favorites);
    });
  }

  addToPlaylist(songId: string) {
    const playlistId = this.selectedPlaylist[songId];
    if (!playlistId) return;

    this.playlistService.addSongToPlaylist(playlistId, songId).subscribe(() => {
      alert('Chanson ajoutée à la playlist 🎉');
    });
  }
}
