import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaylistService, Playlist } from '../../services/playlist.service';
import { PlaylistDetailsComponent } from '../playlist-details/playlist-details.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PlaylistDetailsComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
      playlists: Playlist[] = [];
  form: FormGroup;
  ownerId = '666666666666666666666666'; 

  selected?: string;
select(id: string) {
  this.selected = id;
}


  constructor(private playlistService: PlaylistService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPlaylists();
  }

  loadPlaylists() {
    this.playlistService.getAll(this.ownerId).subscribe(data => this.playlists = data);
  }

  createPlaylist() {
    if (this.form.valid) {
      const payload = { name: this.form.value.name, owner: this.ownerId };
      this.playlistService.create(payload).subscribe(() => {
        this.form.reset();
        this.loadPlaylists(); 
      });
    }
  }

  deletePlaylist(id: string) {
    this.playlistService.delete(id).subscribe(() => this.loadPlaylists());
  }
}
