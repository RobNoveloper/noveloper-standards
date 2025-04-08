/// <reference types="vite/client" />

import { IncomingMessage, ServerResponse } from 'http';
import { Server } from 'http';

// This fixes the type error in server/vite.ts
declare module 'vite' {
  interface ServerOptions {
    middlewareMode?: boolean;
    hmr?: {
      server?: Server<typeof IncomingMessage, typeof ServerResponse>;
    };
    allowedHosts?: boolean | string[] | true;
  }
}