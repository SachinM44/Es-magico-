import { Router } from 'express';
import { prisma } from '../prisma.js';
import { createDiscussionSchema } from '../schemas/discussion.js';

export const discussionsRouter = Router({ mergeParams: true });

discussionsRouter.post('/', async (req, res) => {
  const leadId = (req.params as { id: string }).id;
  const data = createDiscussionSchema.parse(req.body);
  const followUpAt = data.followUpAt ? new Date(data.followUpAt) : undefined;

  const discussion = await prisma.$transaction(async (tx) => {
    if (followUpAt) {
      await tx.lead.update({
        where: { id: leadId },
        data: { followUpAt },
      });
    } else {
      await tx.lead.findUniqueOrThrow({ where: { id: leadId } });
    }
    return tx.discussion.create({
      data: { leadId, note: data.note, followUpAt },
    });
  });

  res.status(201).json(discussion);
});
