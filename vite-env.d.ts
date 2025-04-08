/// <reference types="vite/client" />

import { IncomingMessage, ServerResponse } from 'http';
import { Server } from 'http';

// This fixes the type error in server/vite.ts
// We're declaring that 'allowedHosts' can specifically be 'true'
declare module 'vite' {
  export interface ServerOptions {
    middlewareMode?: boolean;
    hmr?: {
      server?: Server<typeof IncomingMessage, typeof ServerResponse>;
    };
    allowedHosts?: true | string[] | undefined;
  }
}