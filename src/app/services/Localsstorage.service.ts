import { Injectable, inject } from '@angular/core';
import { LOCAL_STORAGE_TOKEN } from './LocalStorage.token';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {
  private storage = inject(LOCAL_STORAGE_TOKEN);
  public readonly enabled = isPlatformBrowser(inject(PLATFORM_ID));

  get length(): number { return this.storage.length; }
  clear(): void { this.storage.clear(); }
  getItem(key: string): string | null { return this.storage.getItem(key); }
  key(index: number): string | null { return this.storage.key(index); }
  removeItem(key: string): void { this.storage.removeItem(key); }
  setItem(key: string, value: string): void { this.storage.setItem(key, value); }
}
