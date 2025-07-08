import { NextRequest, NextResponse } from 'next/server';
import { getAllRaffleEntries, getTotalRaffleEntries } from '@/lib/raffle-store';
import { getCredits } from '@/lib/credits';

export async function GET(request: NextRequest) {
  try {
    const raffleEntries = getAllRaffleEntries();
    const totalEntries = getTotalRaffleEntries();
    
    // Get unique users and their credit counts
    const users = Array.from(new Set(raffleEntries.map(entry => entry.userId)));
    const userStats = users.map(userId => ({
      userId,
      credits: getCredits(userId),
      raffleEntries: raffleEntries.filter(entry => entry.userId === userId).length,
      totalSpent: raffleEntries
        .filter(entry => entry.userId === userId)
        .reduce((sum, entry) => sum + entry.purchaseAmount, 0),
    }));

    // Add demo user if not in raffle entries
    if (!users.includes('demo-user')) {
      userStats.push({
        userId: 'demo-user',
        credits: getCredits('demo-user'),
        raffleEntries: 0,
        totalSpent: 0,
      });
    }

    return NextResponse.json({
      totalRaffleEntries: totalEntries,
      totalUsers: userStats.length,
      userStats,
      raffleEntries: raffleEntries.map(entry => ({
        ...entry,
        entryDate: entry.entryDate.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}