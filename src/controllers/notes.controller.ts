import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { notes, Note } from "../data/notes.store.js";
import { logger } from "../utils/logger.js";

// GET /v1/notes?q=&sort=
export function listNotes(req: Request, res: Response): void {
    const { q, sort } = req.query as { q?: string; sort?: "asc" | "desc" };

    let result = [...notes].filter((n) => n.createdBy === req.user.sub);

    if (q) {
        const query = q.toLowerCase();
        result = result.filter((note) =>
            [note.title, note.content, note.category]
            .filter(Boolean)
            .some((field) => field!.toLowerCase().includes(query))
        );
    }

    if (sort) {
        result.sort((a, b) =>
            sort === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
        );
    }

    res.status(200).json(result);
}

// GET /v1/notes/:id
export function getNoteById(req: Request, res: Response): void {
    const { id } = req.params;

    const note = notes.find((n) => n.id === id);

    if (!note) {
        res.status(404).json({ error: "Note not found" });
        return;
    }

    res.status(200).json(note);
}


// POST /v1/notes
export function createNote(req: Request, res: Response): void {
    const { title, content, category, tags = [] } = req.body;
    const now = Date.now();
    const note: Note = {
        id: uuid(),
        title,
        content,
        category,
        tags,
        createdBy: req.user.sub,
        createdAt: now,
        updatedAt: now
    };

    logger.notes("NOTE_CREATED", {
        noteId: note.id,
        user: req.user.sub,
    });

    notes.push(note);

    res.status(201).json(note);
}


// PATCH /v1/notes/:id
export function updateNote(req: Request, res: Response): void {
    const { id } = req.params;
    const note = notes.find((n) => n.id === id);

    if (!note) {
        res.status(404).json({ error: "Note not found" });
        return;
    }

    const { title, content, category, tags } = req.body;

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (category !== undefined) note.category = category;
    if (tags !== undefined) note.tags = tags;

    note.updatedAt = Date.now();

    res.status(200).json(note);
}


// DELETE /v1/notes/:id
export function deleteNote(req: Request, res: Response): void {
    const { id } = req.params;
    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
        res.status(404).json({ error: "Note not found" });
        return;
    }

    notes.splice(index, 1);
    res.sendStatus(204);
}