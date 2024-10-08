import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import React from "react";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' 'unsafe-inline'; img-src data: https://*.mux.com;
        connect-src blob: data: '*localhost* https://api.sprig.com https://*.mux.com https://storage.googleapis.com https://cdn.sprig.com https://cdn.userleap.com;
        font-src data:;
        media-src blob: https://*.mux.com;
        worker-src blob:;"
        /> */}
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
