/**
 * Raffle entry management
 */

export interface RaffleEntry {
  id: string;
  userId: string;
  entryDate: Date;
  purchaseAmount: number;
  status: 'active' | 'winner' | 'expired';
}

interface RaffleStore {
  [userId: string]: RaffleEntry[];
}

// Simple in-memory store for demo purposes
let raffleStore: RaffleStore = {};

export function addRaffleEntry(
  userId: string, 
  purchaseAmount: number
): RaffleEntry {
  const entry: RaffleEntry = {
    id: `raffle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    entryDate: new Date(),
    purchaseAmount,
    status: 'active',
  };

  if (!raffleStore[userId]) {
    raffleStore[userId] = [];
  }

  raffleStore[userId].push(entry);
  return entry;
}

export function getRaffleEntries(userId: string): RaffleEntry[] {
  return raffleStore[userId] || [];
}

export function getAllRaffleEntries(): RaffleEntry[] {
  return Object.values(raffleStore).flat();
}

export function getTotalRaffleEntries(): number {
  return getAllRaffleEntries().length;
}

export function getUserRaffleCount(userId: string): number {
  return getRaffleEntries(userId).length;
}

// Initialize with some demo data
export function initializeDemoRaffleEntries(): void {
  addRaffleEntry('demo-user', 7);
  addRaffleEntry('user-123', 7);
  addRaffleEntry('user-456', 14);
}