'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Trophy, CreditCard, DollarSign, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';

interface UserStats {
  userId: string;
  credits: number;
  raffleEntries: number;
  totalSpent: number;
}

interface RaffleEntry {
  id: string;
  userId: string;
  entryDate: string;
  purchaseAmount: number;
  status: string;
}

interface AdminStats {
  totalRaffleEntries: number;
  totalUsers: number;
  userStats: UserStats[];
  raffleEntries: RaffleEntry[];
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    setRefreshing(true);
    const response = await apiClient.get<AdminStats>('/api/admin/stats');
    
    if (response.success && response.data) {
      setStats(response.data);
    } else {
      toast.error(response.error || 'Failed to fetch admin stats');
    }
    
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto py-12">
          <div className="text-center">
            <p className="text-red-600">Failed to load admin stats</p>
            <Button onClick={fetchStats} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalRevenue = stats.userStats.reduce((sum, user) => sum + user.totalSpent, 0);
  const totalCreditsInCirculation = stats.userStats.reduce((sum, user) => sum + user.credits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Monitor credits, raffle entries, and user activity
            </p>
          </div>
          <Button 
            onClick={fetchStats} 
            disabled={refreshing}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Raffle Entries</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRaffleEntries}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits in Circulation</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCreditsInCirculation}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* User Stats Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>
                Current credits and raffle entries per user
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.userStats.map((user) => (
                  <div key={user.userId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{user.userId}</div>
                      <div className="text-sm text-gray-500">
                        Total spent: ${user.totalSpent}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        {user.credits} credits
                      </Badge>
                      <Badge variant="outline">
                        {user.raffleEntries} entries
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Raffle Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Raffle Entries</CardTitle>
              <CardDescription>
                Latest raffle entries from purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.raffleEntries
                  .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime())
                  .slice(0, 10)
                  .map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{entry.userId}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(entry.entryDate).toLocaleDateString()} at{' '}
                          {new Date(entry.entryDate).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          ${entry.purchaseAmount}
                        </Badge>
                        <Badge 
                          variant={entry.status === 'active' ? 'default' : 'outline'}
                        >
                          {entry.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                {stats.raffleEntries.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No raffle entries yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-gray-500">
          <p>Admin Dashboard • Real-time data with automatic refresh</p>
          <p className="mt-1">Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}