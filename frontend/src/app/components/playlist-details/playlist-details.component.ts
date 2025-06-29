import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService, Playlist } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-details',
  imports: [CommonModule],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.css'
})
export class PlaylistDetailsComponent implements OnInit {
   @Input() playlistId!: string;
  playlist?: Playlist;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    if (this.playlistId) {
      this.playlistService.getAll().subscribe(playlists => {
        this.playlist = playlists.find(p => p._id === this.playlistId);
      });
    }
  }
}
