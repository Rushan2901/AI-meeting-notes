import { z } from 'zod';

export const createNoteSchema = z.object({
  title z.string().min(1).max(200),
  content z.any(),
});

export const updateNoteSchema = z.object({
  title z.string().min(1).max(200).optional(),
  content z.any().optional(),
});

export const noteIdSchema = z.object({
  noteId z.string().uuid(),
});
