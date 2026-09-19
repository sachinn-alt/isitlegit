import Dexie, { type Table } from 'dexie';
import { ScanRecord } from '@/types';

export class IsItLegitDatabase extends Dexie {
  scans!: Table<ScanRecord, string>;

  constructor() {
    super('IsItLegitDB');
    this.version(1).stores({
      scans: 'id, type, threatScore, verdict, bookmarked, createdAt',
    });
  }
}

export const db = new IsItLegitDatabase();
