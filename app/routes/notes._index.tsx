import { Link } from "@remix-run/react";
import React from "react";

export default function NoteIndexPage() {
  return (
    <p>
      No note selected. Select a note on the left, or{" "}
      <Link to="new" className="text-stone-950 underline">
        create a new note.
      </Link>
    </p>
  );
}
