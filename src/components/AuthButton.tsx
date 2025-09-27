import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AuthButton = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Button variant="outline" disabled className="animate-pulse">
        Loading...
      </Button>
    );
  }

  if (!user) {
    return (
      <Link to="/auth">
        <Button variant="cosmic">
          <User className="w-4 h-4 mr-2" />
          Sign In
        </Button>
      </Link>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          {user.email}
          {isAdmin && <Shield className="w-4 h-4 text-cosmic-accent" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          {user.email}
          {isAdmin && (
            <span className="text-xs bg-cosmic-accent/20 text-cosmic-accent px-2 py-1 rounded">
              Admin
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem onClick={() => navigate('/admin')}>
            <Shield className="w-4 h-4 mr-2" />
            Admin Panel
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          <User className="w-4 h-4 mr-2" />
          My Readings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;