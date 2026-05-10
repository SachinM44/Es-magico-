import { Prisma } from '@prisma/client';
import { Router } from 'express';
import { prisma } from '../prisma.js';
import { createLeadSchema, listLeadsQuerySchema, updateLeadSchema } from '../schemas/lead.js';
import { discussionsRouter } from './discussions.js';

export const leadsRouter = Router();

leadsRouter.get('/', async (req, res) => {
  const query = listLeadsQuerySchema.parse(req.query);
  const where: Prisma.LeadWhereInput = {};
  if (query.status) where.status = query.status;
  if (query.q) {
    where.OR = [
      { name: { contains: query.q, mode: 'insensitive' } },
      { company: { contains: query.q, mode: 'insensitive' } },
    ];
  }
  if (query.followUp === 'today') {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    where.followUpAt = { gte: start, lt: end };
  } else if (query.followUp === 'overdue') {
    where.followUpAt = { lt: new Date() };
  }
  const leads = await prisma.lead.findMany({
    where,
    orderBy: [{ followUpAt: { sort: 'asc', nulls: 'last' } }, { createdAt: 'desc' }],
    include: {
      discussions: { orderBy: { createdAt: 'desc' }, take: 1, select: { note: true } },
    },
  });
  const result = leads.map(({ discussions, ...lead }) => ({
    ...lead,
    lastNote: discussions[0]?.note ?? null,
  }));
  res.status(200).json(result);
});

leadsRouter.post('/', async (req, res) => {
  const data = createLeadSchema.parse(req.body);
  const lead = await prisma.lead.create({
    data: {
      ...data,
      followUpAt: data.followUpAt ? new Date(data.followUpAt) : undefined,
    },
  });
  res.status(201).json(lead);
});

leadsRouter.get('/:id', async (req, res) => {
  const lead = await prisma.lead.findUniqueOrThrow({
    where: { id: req.params.id },
    include: { discussions: { orderBy: { createdAt: 'desc' } } },
  });
  res.status(200).json(lead);
});

leadsRouter.patch('/:id', async (req, res) => {
  const data = updateLeadSchema.parse(req.body);
  const lead = await prisma.lead.update({
    where: { id: req.params.id },
    data: {
      ...data,
      followUpAt:
        data.followUpAt === undefined
          ? undefined
          : data.followUpAt === null
            ? null
            : new Date(data.followUpAt),
    },
  });
  res.status(200).json(lead);
});

leadsRouter.use('/:id/discussions', discussionsRouter);
