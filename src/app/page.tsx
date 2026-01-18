"use client";

import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const saveNote = async () => {
    if (!title || !content) return;

    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");

    const res = await fetch("/api/notes");
    setNotes(await res.json());
  };

  return (
    <main className="container">
      <h1 className="title">📝 AI Meeting Notes</h1>

      <input
        className="w-full p-3 border rounded-lg mt-4"
        placeholder="Meeting title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-3 border rounded-lg mt-3"
        placeholder="Meeting notes..."
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="btn" onClick={saveNote}>
        Save Note
      </button>

      <div className="note-list">
        {notes.length === 0 ? (
          <p>No meeting notes yet.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
