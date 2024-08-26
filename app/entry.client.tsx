import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { sprig } from '@sprig-technologies/sprig-browser';
import React from "react";

export const Sprig = sprig.configure({
  environmentId: 'x1YxSLS7jYZB',
})

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
