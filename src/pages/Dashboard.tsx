import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import AuthButton from '@/components/AuthButton';

interface Reading {
  id: string;
  reading_type: string;
  title: string;
  content: any;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchReadings();
    }
  }, [user]);

  const fetchReadings = async () => {
    try {
      const { data, error } = await supabase
        .from('readings')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching readings:', error);
      } else {
        setReadings(data || []);
      }
    } catch (error) {
      console.error('Error fetching readings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cosmic-accent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getReadingTypeColor = (type: string) => {
    const colors = {
      tarot: 'bg-purple-500/20 text-purple-300',
      astrology: 'bg-blue-500/20 text-blue-300',
      numerology: 'bg-green-500/20 text-green-300',
      palmistry: 'bg-yellow-500/20 text-yellow-300',
      bone_reading: 'bg-red-500/20 text-red-300',
      cleansing: 'bg-indigo-500/20 text-indigo-300',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-300';
  };

  return (
    <div className="min-h-screen bg-cosmic-dark">
      <div className="absolute inset-0 bg-gradient-cosmic opacity-20" />
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cosmic-light">My Readings</h1>
          <AuthButton />
        </nav>

        {/* Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-cosmic-light mb-2">
              Welcome back, {user.user_metadata?.full_name || user.email}
            </h2>
            <p className="text-cosmic-muted">
              Here are your saved reading results and spiritual insights.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-cosmic-surface/80 backdrop-blur-lg border-cosmic-accent/30">
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : readings.length === 0 ? (
            <Card className="bg-cosmic-surface/80 backdrop-blur-lg border-cosmic-accent/30 text-center py-12">
              <CardContent>
                <p className="text-cosmic-muted text-lg mb-4">
                  No readings yet. Start your spiritual journey!
                </p>
                <p className="text-cosmic-muted/60">
                  Contact Travis to schedule your first reading or explore our automated services.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readings.map((reading) => (
                <Card 
                  key={reading.id} 
                  className="bg-cosmic-surface/80 backdrop-blur-lg border-cosmic-accent/30 hover:border-cosmic-accent/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-cosmic-light text-lg">
                        {reading.title}
                      </CardTitle>
                      <Badge className={getReadingTypeColor(reading.reading_type)}>
                        {reading.reading_type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardDescription className="text-cosmic-muted">
                      {new Date(reading.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-cosmic-muted/80 text-sm">
                      {typeof reading.content === 'object' ? (
                        <div className="space-y-2">
                          {Object.entries(reading.content).slice(0, 3).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium text-cosmic-light capitalize">
                                {key.replace('_', ' ')}: 
                              </span>
                              <span className="ml-1">
                                {typeof value === 'string' ? value.slice(0, 50) + '...' : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>{String(reading.content).slice(0, 100)}...</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;