import { Router } from "express";
import {
    listNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} from "../controllers/notes.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
    createNoteSchema,
    updateNoteSchema,
    noteIdParamSchema,
    listNotesQuerySchema
} from "../schemas/notes.schema.js";

const router = Router();

router.use(requireAuth);

// GET /v1/notes
router.get(
"/",
validate({ query: listNotesQuerySchema }),
listNotes
);

// GET /v1/notes/:id
router.get(
"/:id",
validate({ params: noteIdParamSchema }),
getNoteById
);

// POST /v1/notes
router.post(
"/",
validate({ body: createNoteSchema }),
createNote
);

// PATCH /v1/notes/:id
router.patch(
"/:id",
validate({ params: noteIdParamSchema, body: updateNoteSchema }),
updateNote
);

// DELETE /v1/notes/:id
router.delete(
"/:id",
validate({ params: noteIdParamSchema }),
deleteNote
);

export default router;