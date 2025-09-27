import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import AuthButton from '@/components/AuthButton';
import { Shield, Edit, Save, X, Plus, Users, BookOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Reading {
  id: string;
  user_id: string;
  reading_type: string;
  title: string;
  content: any;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReading, setEditingReading] = useState<Reading | null>(null);
  const [newReading, setNewReading] = useState({
    user_id: '',
    reading_type: '',
    title: '',
    content: {}
  });

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    try {
      // Fetch all readings with user profiles
      const { data: readingsData, error: readingsError } = await supabase
        .from('readings')
        .select('*')
        .order('created_at', { ascending: false });

      if (readingsError) {
        console.error('Error fetching readings:', readingsError);
      } else {
        // Fetch user details for each reading
        const readingsWithProfiles = await Promise.all(
          (readingsData || []).map(async (reading) => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, email')
              .eq('user_id', reading.user_id)
              .single();
            
            return {
              ...reading,
              profiles: profile
            };
          })
        );
        setReadings(readingsWithProfiles);
      }

      // Fetch all users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) {
        console.error('Error fetching users:', usersError);
      } else {
        setUsers(usersData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReading = async (reading: Reading) => {
    try {
      const { error } = await supabase
        .from('readings')
        .update({
          title: reading.title,
          content: reading.content,
          reading_type: reading.reading_type
        })
        .eq('id', reading.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update reading",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Reading updated successfully",
        });
        setEditingReading(null);
        fetchData();
      }
    } catch (error) {
      console.error('Error updating reading:', error);
      toast({
        title: "Error",
        description: "Failed to update reading",
        variant: "destructive",
      });
    }
  };

  const createReading = async () => {
    try {
      const { error } = await supabase
        .from('readings')
        .insert([{
          user_id: newReading.user_id,
          reading_type: newReading.reading_type,
          title: newReading.title,
          content: typeof newReading.content === 'string' 
            ? JSON.parse(newReading.content) 
            : newReading.content
        }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create reading",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Reading created successfully",
        });
        setNewReading({
          user_id: '',
          reading_type: '',
          title: '',
          content: {}
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating reading:', error);
      toast({
        title: "Error",
        description: "Failed to create reading",
        variant: "destructive",
      });
    }
  };

  const deleteReading = async (id: string) => {
    try {
      const { error } = await supabase
        .from('readings')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete reading",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Reading deleted successfully",
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting reading:', error);
      toast({
        title: "Error",
        description: "Failed to delete reading",
        variant: "destructive",
      });
    }
  };

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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cosmic-accent"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-cosmic-dark">
      <div className="absolute inset-0 bg-gradient-cosmic opacity-20" />
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-cosmic-accent" />
            <h1 className="text-2xl font-bold text-cosmic-light">Admin Panel</h1>
          </div>
          <AuthButton />
        </nav>

        {/* Content */}
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-cosmic-light mb-2">
              Welcome, Travis
            </h2>
            <p className="text-cosmic-muted">
              Manage client readings and user accounts from your admin dashboard.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-cosmic-surface/80 backdrop-blur-lg border-cosmic-accent/30">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BookOpen className="w-8 h-8 text-cosmic-accent mr-4" />
                  <div>
                    <p className="text-cosmic-muted text-sm">Total Readings</p>
                    <p className="text-2xl font-bold text-cosmic-light">{readings.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-cosmic-surface/80 backdrop-blur-lg border-cosmic-accent/30">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-cosmic-accent mr-4" />
                  <div>
                    <p className="text-cosmic-muted text-sm">Total Users</p>
                    <p className="text-2xl font-bold text-cosmic-light">{users.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-cosmic-surface/80 backdrop-blur-lg border-cosmic-accent/30">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Plus className="w-8 h-8 text-cosmic-accent mr-4" />
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="cosmic" size="sm">
                          Create Reading
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-cosmic-surface border-cosmic-accent/30">
                        <DialogHeader>
                          <DialogTitle className="text-cosmic-light">Create New Reading</DialogTitle>
                          <DialogDescription className="text-cosmic-muted">
                            Add a new reading result for a client
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-cosmic-light">Client</Label>
                            <Select value={newReading.user_id} onValueChange={(value) => setNewReading(prev => ({ ...prev, user_id: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a client" />
                              </SelectTrigger>
                              <SelectContent>
                                {users.map((user) => (
                                  <SelectItem key={user.id} value={user.id}>
                                    {user.full_name || user.email}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-cosmic-light">Reading Type</Label>
                            <Select value={newReading.reading_type} onValueChange={(value) => setNewReading(prev => ({ ...prev, reading_type: value }))}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select reading type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tarot">Tarot</SelectItem>
                                <SelectItem value="astrology">Astrology</SelectItem>
                                <SelectItem value="numerology">Numerology</SelectItem>
                                <SelectItem value="palmistry">Palmistry</SelectItem>
                                <SelectItem value="bone_reading">Bone Reading</SelectItem>
                                <SelectItem value="cleansing">Cleansing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-cosmic-light">Title</Label>
                            <Input
                              value={newReading.title}
                              onChange={(e) => setNewReading(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Reading title"
                              className="bg-cosmic-dark border-cosmic-accent/30"
                            />
                          </div>
                          <div>
                            <Label className="text-cosmic-light">Content (JSON)</Label>
                            <Textarea
                              value={typeof newReading.content === 'string' ? newReading.content : JSON.stringify(newReading.content, null, 2)}
                              onChange={(e) => setNewReading(prev => ({ ...prev, content: e.target.value }))}
                              placeholder='{"interpretation": "Your reading content here"}'
                              rows={6}
                              className="bg-cosmic-dark border-cosmic-accent/30"
                            />
                          </div>
                          <Button onClick={createReading} variant="cosmic" className="w-full">
                            Create Reading
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Readings Management */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-cosmic-light mb-4">Client Readings</h3>
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
                    No readings found.
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
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingReading(reading)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteReading(reading.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className={getReadingTypeColor(reading.reading_type)}>
                          {reading.reading_type.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-cosmic-muted">
                          {reading.profiles?.full_name || reading.profiles?.email}
                        </span>
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

          {/* Edit Reading Dialog */}
          {editingReading && (
            <Dialog open={!!editingReading} onOpenChange={() => setEditingReading(null)}>
              <DialogContent className="bg-cosmic-surface border-cosmic-accent/30 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-cosmic-light">Edit Reading</DialogTitle>
                  <DialogDescription className="text-cosmic-muted">
                    Update the reading details and content
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-cosmic-light">Title</Label>
                    <Input
                      value={editingReading.title}
                      onChange={(e) => setEditingReading(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="bg-cosmic-dark border-cosmic-accent/30"
                    />
                  </div>
                  <div>
                    <Label className="text-cosmic-light">Reading Type</Label>
                    <Select 
                      value={editingReading.reading_type} 
                      onValueChange={(value) => setEditingReading(prev => prev ? { ...prev, reading_type: value } : null)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tarot">Tarot</SelectItem>
                        <SelectItem value="astrology">Astrology</SelectItem>
                        <SelectItem value="numerology">Numerology</SelectItem>
                        <SelectItem value="palmistry">Palmistry</SelectItem>
                        <SelectItem value="bone_reading">Bone Reading</SelectItem>
                        <SelectItem value="cleansing">Cleansing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-cosmic-light">Content (JSON)</Label>
                    <Textarea
                      value={JSON.stringify(editingReading.content, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setEditingReading(prev => prev ? { ...prev, content: parsed } : null);
                        } catch {
                          // Invalid JSON, but allow editing
                          setEditingReading(prev => prev ? { ...prev, content: e.target.value } : null);
                        }
                      }}
                      rows={10}
                      className="bg-cosmic-dark border-cosmic-accent/30 font-mono text-sm"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={() => updateReading(editingReading)} variant="cosmic" className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={() => setEditingReading(null)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;