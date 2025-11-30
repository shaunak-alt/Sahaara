import { Controller, Get } from '@nestjs/common';

const legalTopics = [
  {
    id: 'pwdva',
    title: 'Protection of Women from Domestic Violence Act, 2005',
    summary:
      'Defines domestic violence across physical, emotional, verbal, sexual, and economic abuse. Reliefs include residence, monetary, and protection orders.',
  },
  {
    id: 'dir',
    title: 'Domestic Incident Report (DIR)',
    summary:
      'Documented with a Protection Officer or Service Provider. Captures your account without requiring evidence at submission time.',
  },
];

@Controller('legal')
export class LegalController {
  @Get('topics')
  listTopics() {
    return {
      disclaimer:
        'This section shares general legal information reviewed by partner advocates. It is not legal advice.',
      topics: legalTopics,
    };
  }
}