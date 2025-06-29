import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './components/song-list/song-list.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { PlaylistComponent } from './components/playlist/playlist.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, SongListComponent, AddSongComponent, PlaylistComponent ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('list') list!: SongListComponent;

  refreshSongs() {
    this.list.ngOnInit(); 
  }
}
