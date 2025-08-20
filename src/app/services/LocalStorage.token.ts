import { InjectionToken, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

function mockLocalStorage(): Storage {
  return {
    length: 0,
    key: (_idx: number) => null,
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {},
    removeItem: (_key: string) => {},
    clear: () => {}
  };
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken<Storage>(
  'LOCAL_STORAGE_TOKEN',
  {
    factory: () => {
      const platformId = inject(PLATFORM_ID);
      const isBrowser = isPlatformBrowser(platformId);
      const document = inject(DOCUMENT);

      if (isBrowser) {
        return document.defaultView?.localStorage ?? mockLocalStorage();
      } else {
        return mockLocalStorage();
      }
    }
  }
);
