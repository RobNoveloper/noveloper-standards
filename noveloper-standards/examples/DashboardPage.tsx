import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Layout, 
  Container, 
  Section, 
  Grid, 
  Card 
} from '../templates/Layout';
import { Button } from '../templates/Button';
import { Modal } from '../templates/Modal';
import { Toast, ToastProvider } from '../templates/toast';
import { apiClient } from '../templates/api-client';
import { useAuth, withAuth } from '../templates/auth-context';
import { 
  User, 
  LineChart, 
  Bell, 
  Settings, 
  LogOut, 
  Plus,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

/**
 * Example Dashboard Page Implementation
 * 
 * This example demonstrates how to use Noveloper standard components
 * to create a complete dashboard page with navigation, data display,
 * and interactive elements.
 */

interface DashboardStats {
  totalUsers: number;
  activeProjects: number;
  completedTasks: number;
  pendingIssues: number;
}

interface RecentActivity {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
}

function DashboardHeader() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-muted">
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-2"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            <span>{user?.firstName || user?.username}</span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-10">
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-muted flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-muted flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <hr className="my-1 border-border" />
                <button 
                  className="w-full px-4 py-2 text-left hover:bg-muted text-destructive flex items-center space-x-2"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardSidebar() {
  return (
    <div className="py-6 space-y-6">
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-foreground">Noveloper</h2>
      </div>
      
      <nav className="space-y-1">
        <a href="/dashboard" className="flex items-center px-4 py-2 bg-primary/10 text-primary rounded-md">
          <LineChart className="h-5 w-5 mr-3" />
          Dashboard
        </a>
        <a href="/projects" className="flex items-center px-4 py-2 text-foreground hover:bg-muted rounded-md">
          <div className="h-5 w-5 mr-3" />
          Projects
        </a>
        <a href="/tasks" className="flex items-center px-4 py-2 text-foreground hover:bg-muted rounded-md">
          <div className="h-5 w-5 mr-3" />
          Tasks
        </a>
        <a href="/reports" className="flex items-center px-4 py-2 text-foreground hover:bg-muted rounded-md">
          <div className="h-5 w-5 mr-3" />
          Reports
        </a>
        <a href="/settings" className="flex items-center px-4 py-2 text-foreground hover:bg-muted rounded-md">
          <div className="h-5 w-5 mr-3" />
          Settings
        </a>
      </nav>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <Card className="flex items-center p-6">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mr-4`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
      </div>
    </Card>
  );
}

function RecentActivityItem({ activity }: { activity: RecentActivity }) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium">
            <span className="text-primary">{activity.user}</span> {activity.action} <span className="font-semibold">{activity.target}</span>
          </p>
        </div>
        <time className="text-xs text-muted-foreground">{activity.timestamp}</time>
      </div>
    </div>
  );
}

function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; props: any }>>([]);
  
  // Fetch dashboard stats
  const { data: stats, isLoading, isError, refetch } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: async () => {
      const response = await apiClient.get<DashboardStats>('/api/dashboard/stats');
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to fetch dashboard stats');
      }
      
      return response.data;
    }
  });
  
  // Fetch recent activity
  const { data: activities } = useQuery({
    queryKey: ['/api/dashboard/activities'],
    queryFn: async () => {
      const response = await apiClient.get<RecentActivity[]>('/api/dashboard/activities');
      
      if (!response.success || !response.data) {
        return [];
      }
      
      return response.data;
    }
  });
  
  // Add a toast message
  const addToast = (props: any) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, props }]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 5000);
  };
  
  // Dismiss a toast message
  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  // Handle refresh button click
  const handleRefresh = () => {
    refetch();
    addToast({
      title: 'Dashboard Refreshed',
      description: 'The dashboard data has been updated.',
      variant: 'info',
    });
  };
  
  // Handle new project button click
  const handleNewProject = () => {
    setIsModalOpen(true);
  };
  
  return (
    <Layout
      header={<DashboardHeader />}
      sidebar={<DashboardSidebar />}
      showSidebar
      maxWidth="full"
    >
      {/* Dashboard content */}
      <Container maxWidth="full" className="py-6">
        {/* Actions Bar */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center space-x-2 w-1/3">
            <div className="relative w-full">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm" className="flex items-center" onClick={handleNewProject}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <Section className="py-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading dashboard data...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-destructive">
              <p>Failed to load dashboard data. Please try again.</p>
              <Button variant="outline" className="mt-4" onClick={() => refetch()}>Retry</Button>
            </div>
          ) : (
            <Grid columns={4} gap={6}>
              <StatCard 
                title="Total Users" 
                value={stats?.totalUsers || 0} 
                icon={<User className="h-6 w-6 text-blue-500" />} 
                color="bg-blue-100"
              />
              <StatCard 
                title="Active Projects" 
                value={stats?.activeProjects || 0}
                icon={<div className="h-6 w-6 text-green-500" />} 
                color="bg-green-100"
              />
              <StatCard 
                title="Completed Tasks" 
                value={stats?.completedTasks || 0}
                icon={<div className="h-6 w-6 text-purple-500" />} 
                color="bg-purple-100"
              />
              <StatCard 
                title="Pending Issues" 
                value={stats?.pendingIssues || 0}
                icon={<div className="h-6 w-6 text-amber-500" />}
                color="bg-amber-100"
              />
            </Grid>
          )}
        </Section>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Main Content */}
          <div className="col-span-2">
            <Card className="h-full p-6">
              <h2 className="text-lg font-semibold mb-6">Performance Overview</h2>
              <div className="h-64 bg-muted/30 rounded-md flex items-center justify-center border border-dashed border-border">
                <p className="text-muted-foreground">Chart Component Would Render Here</p>
              </div>
            </Card>
          </div>
          
          {/* Sidebar Content */}
          <div>
            <Card className="h-full p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              
              <div className="space-y-0 divide-y">
                {activities && activities.length > 0 ? (
                  activities.map((activity) => (
                    <RecentActivityItem key={activity.id} activity={activity} />
                  ))
                ) : (
                  <p className="py-4 text-muted-foreground">No recent activity to display.</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </Container>
      
      {/* New Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        description="Add a new project to your dashboard."
        footer={
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setIsModalOpen(false);
                addToast({
                  title: 'Project Created',
                  description: 'Your new project has been created successfully.',
                  variant: 'success',
                });
              }}
            >
              Create Project
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium mb-1">
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter project name"
            />
          </div>
          
          <div>
            <label htmlFor="project-description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="project-description"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              rows={3}
              placeholder="Enter project description"
            />
          </div>
          
          <div>
            <label htmlFor="project-deadline" className="block text-sm font-medium mb-1">
              Deadline
            </label>
            <input
              id="project-deadline"
              type="date"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </Modal>
      
      {/* Toast Messages */}
      <ToastProvider>
        {toasts.map(({ id, props }) => (
          <Toast 
            key={id} 
            {...props} 
            onClose={() => dismissToast(id)} 
          />
        ))}
      </ToastProvider>
    </Layout>
  );
}

// Wrap the dashboard page with authentication protection
export default withAuth(DashboardPage);