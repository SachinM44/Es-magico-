import { PrismaClient } from '@prisma/client';
import type { LeadStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
faker.seed(20260509);

function todayAt14Local(): Date {
  const d = new Date();
  d.setHours(14, 0, 0, 0);
  return d;
}

function offsetDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

type DiscussionInput = {
  note: string;
  followUpAt: Date | null;
  createdAt: Date;
};

type SeedLead = {
  status: LeadStatus;
  discussions: DiscussionInput[];
};

const T = todayAt14Local();

const plan: SeedLead[] = [
  {
    status: 'NEW',
    discussions: [
      {
        note: 'Inbound from website contact form.',
        followUpAt: null,
        createdAt: offsetDays(T, -3),
      },
      { note: 'Left voicemail; awaiting callback.', followUpAt: T, createdAt: offsetDays(T, -1) },
    ],
  },
  {
    status: 'CONTACTED',
    discussions: [
      {
        note: 'First call: budget confirmed, decision-maker identified.',
        followUpAt: offsetDays(T, 7),
        createdAt: offsetDays(T, -10),
      },
      {
        note: 'Follow-up email sent with case studies.',
        followUpAt: offsetDays(T, -2),
        createdAt: offsetDays(T, -5),
      },
    ],
  },
  {
    status: 'QUALIFIED',
    discussions: [
      {
        note: 'Discovery call complete; pain points captured.',
        followUpAt: null,
        createdAt: offsetDays(T, -8),
      },
      {
        note: 'Sent pricing one-pager.',
        followUpAt: offsetDays(T, 3),
        createdAt: offsetDays(T, -2),
      },
      {
        note: 'Procurement intro scheduled.',
        followUpAt: offsetDays(T, 5),
        createdAt: offsetDays(T, -1),
      },
    ],
  },
  {
    status: 'PROPOSAL_SENT',
    discussions: [
      {
        note: 'Proposal v1 delivered to champion.',
        followUpAt: offsetDays(T, 2),
        createdAt: offsetDays(T, -4),
      },
      {
        note: 'Legal review in progress on MSA.',
        followUpAt: offsetDays(T, 10),
        createdAt: offsetDays(T, -1),
      },
    ],
  },
  {
    status: 'WON',
    discussions: [
      { note: 'Verbal yes from VP Sales.', followUpAt: null, createdAt: offsetDays(T, -20) },
      {
        note: 'Contract signed; kickoff handed to onboarding.',
        followUpAt: null,
        createdAt: offsetDays(T, -14),
      },
    ],
  },
  {
    status: 'LOST',
    discussions: [
      {
        note: 'Closed-lost: chose an incumbent vendor.',
        followUpAt: null,
        createdAt: offsetDays(T, -30),
      },
    ],
  },
];

async function main(): Promise<void> {
  await prisma.discussion.deleteMany();
  await prisma.lead.deleteMany();

  for (const item of plan) {
    const latestWithFollowUp = [...item.discussions]
      .filter((d) => d.followUpAt !== null)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .pop();

    await prisma.lead.create({
      data: {
        name: faker.person.fullName(),
        company: faker.company.name(),
        phone: faker.phone.number(),
        status: item.status,
        followUpAt: latestWithFollowUp?.followUpAt ?? null,
        discussions: { create: item.discussions },
      },
    });
  }

  const leadCount = await prisma.lead.count();
  const discussionCount = await prisma.discussion.count();
  console.log(`Seeded ${leadCount} leads and ${discussionCount} discussions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
