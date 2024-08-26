import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { Note } from "~/models/note.server";
import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { Sprig } from '../entry.client';
import React from "react";

type LoaderData = {
  noteListItems: Note[];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

export default function NotesPage() {
  const data = useLoaderData<typeof loader>() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-stone-950 hover:text-stone-500">
            + New Note
          </Link>

          <hr />

          {data.noteListItems.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
              <ol>
                {data.noteListItems.map((note) => (
                  <li key={note.id}>
                    <NavLink
                      className={({ isActive }) =>
                        `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                      }
                      to={note.id}
                    >
                      📝 {note.title}
                    </NavLink>
                  </li>
                ))}
              </ol>
            )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Function to logout user and clear out any active surveys
export const handleUserLogout = () => {
  Sprig.logoutUser();
  Sprig.dismissActiveSurvey();
  return
};

function Header() {
  const user = useUser();
  return (
    <header className="flex items-center justify-between bg-amber-400 p-4 text-black">
      <h1 className="text-3xl font-bold">
        <Link to=".">Notes</Link>
      </h1>
      <p>{user.email}</p>
      <Form action="/logout" method="post">
        <button
          type="submit"
          className="rounded bg-slate-950 py-2 px-4 text-slate-50 hover:bg-slate-500 active:bg-slate-500"
          onClick={handleUserLogout}
        >
          Logout
        </button>
      </Form>
    </header>
  );
}
