import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SongService } from '../../services/song.service';

@Component({
  selector: 'app-add-song',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-song.component.html',
  styleUrl: './add-song.component.css'
})
export class AddSongComponent {
  form: FormGroup;
  success = false;

  constructor(private fb: FormBuilder, private songService: SongService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      album: [''],
      duration: [0, Validators.required],
      audioUrl: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      this.songService.create(this.form.value).subscribe(() => {
        this.success = true;
        this.form.reset();
      });
    }
  }
}
