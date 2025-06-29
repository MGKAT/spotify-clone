import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, animationFrameScheduler, interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private audioCtx = new AudioContext();
  private gainNode = this.audioCtx.createGain();
  private bufferSource: AudioBufferSourceNode | null = null;
  private startTime = 0;      
  private pauseOffset = 0;    

  private _isPlaying = new BehaviorSubject<boolean>(false);
  private _duration   = new BehaviorSubject<number>(0);
  private _currentTime= new BehaviorSubject<number>(0);

  constructor() {
    this.gainNode.connect(this.audioCtx.destination);
  }

  isPlaying$(): Observable<boolean> { return this._isPlaying.asObservable(); }
  duration$():  Observable<number> { return this._duration.asObservable(); }
  currentTime$():Observable<number> { return this._currentTime.asObservable(); }

  async load(url: string) {
    this.stop();
    const resp = await fetch(url);
    const array = await resp.arrayBuffer();
    const audioBuffer = await this.audioCtx.decodeAudioData(array);
    this._duration.next(audioBuffer.duration);
    this.bufferSource = this.audioCtx.createBufferSource();
    this.bufferSource.buffer = audioBuffer;
    this.bufferSource.connect(this.gainNode);
  }

  play() {
    if (!this.bufferSource) return;

    this.startTime = this.audioCtx.currentTime - this.pauseOffset;
    this.bufferSource.start(0, this.pauseOffset);
    this._isPlaying.next(true);

    interval(1000, animationFrameScheduler).pipe(
      map(() => this.audioCtx.currentTime - this.startTime),
      takeWhile(t => t <= (this._duration.value || Infinity))
    ).subscribe(t => this._currentTime.next(t),
                () => {},
                () => this.stop());
  }

  pause() {
    if (!this.bufferSource) return;
    this.bufferSource.stop();
    this.pauseOffset = this.audioCtx.currentTime - this.startTime;
    this._isPlaying.next(false);

    const buf = this.bufferSource.buffer!;
    this.bufferSource.disconnect();
    this.bufferSource = this.audioCtx.createBufferSource();
    this.bufferSource.buffer = buf;
    this.bufferSource.connect(this.gainNode);
  }

  stop() {
    if (this.bufferSource) {
      try { this.bufferSource.stop(); } catch {}
      this.bufferSource.disconnect();
      this.bufferSource = null;
    }
    this.pauseOffset = 0;
    this._currentTime.next(0);
    this._isPlaying.next(false);
  }

  seek(to: number) {
    this.pauseOffset = to;
    if (this._isPlaying.value) {
      this.pause();
      this.play();
    } else {
      this._currentTime.next(to);
    }
  }

  setVolume(v: number) {
    this.gainNode.gain.value = v;
  }
}
