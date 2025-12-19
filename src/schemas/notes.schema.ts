import { z } from "zod";

// POST /v1/notes
export const createNoteSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().optional(),
    tags: z.array(z.string()).optional()
});


// PATCH /v1/notes/:id 
export const updateNoteSchema = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional()
});


// :id parameter
export const noteIdParamSchema = z.object({
    id: z.string().uuid("Invalid note id")
});

// Query: ?q=&sort=
export const listNotesQuerySchema = z.object({
    q: z.string().optional(),
    sort: z.enum(["asc", "desc"]).optional()
});