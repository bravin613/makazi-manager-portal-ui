
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  CreditCard, 
  Search,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  Home,
  Moon,
  Sun,
  LogOut
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Landlord {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [landlords, setLandlords] = useState<Landlord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLandlord, setEditingLandlord] = useState<Landlord | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockLandlords: Landlord[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, State 12345',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Ave, City, State 12345',
        createdAt: '2024-01-20'
      },
      {
        id: '3',
        name: 'Michael Brown',
        email: 'michael.brown@email.com',
        phone: '+1 (555) 456-7890',
        address: '789 Pine St, City, State 12345',
        createdAt: '2024-02-01'
      }
    ];
    setLandlords(mockLandlords);
  }, []);

  const filteredLandlords = landlords.filter(landlord =>
    landlord.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    landlord.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    landlord.phone.includes(searchTerm)
  );

  const handleAddLandlord = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    const newLandlord: Landlord = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLandlords([...landlords, newLandlord]);
    setFormData({ name: '', email: '', phone: '', address: '' });
    setIsAddDialogOpen(false);
    toast.success('Landlord added successfully!');
  };

  const handleEditLandlord = (landlord: Landlord) => {
    setEditingLandlord(landlord);
    setFormData({
      name: landlord.name,
      email: landlord.email,
      phone: landlord.phone,
      address: landlord.address
    });
  };

  const handleUpdateLandlord = () => {
    if (!editingLandlord) return;

    const updatedLandlords = landlords.map(landlord =>
      landlord.id === editingLandlord.id
        ? { ...landlord, ...formData }
        : landlord
    );

    setLandlords(updatedLandlords);
    setEditingLandlord(null);
    setFormData({ name: '', email: '', phone: '', address: '' });
    toast.success('Landlord updated successfully!');
  };

  const handleDeleteLandlord = (id: string) => {
    const updatedLandlords = landlords.filter(landlord => landlord.id !== id);
    setLandlords(updatedLandlords);
    toast.success('Landlord deleted successfully!');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'landlords', label: 'Landlords', icon: Users },
    { id: 'properties', label: 'Properties', icon: Building },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Quick Add
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Landlords</CardTitle>
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{landlords.length}</div>
            <p className="text-xs text-blue-600 dark:text-blue-300">Active accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Properties</CardTitle>
            <Building className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">24</div>
            <p className="text-xs text-green-600 dark:text-green-300">Under management</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">Monthly Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">$12,450</div>
            <p className="text-xs text-purple-600 dark:text-purple-300">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-200">Occupancy Rate</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">87%</div>
            <p className="text-xs text-orange-600 dark:text-orange-300">21 of 24 units occupied</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest property management activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New landlord registration</p>
                  <p className="text-xs text-gray-500">John Smith registered 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-gray-500">$1,250 rent payment for Unit 4B</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Property added</p>
                  <p className="text-xs text-gray-500">New property at 789 Pine St</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">This Month's Collections</span>
                <Badge className="bg-green-100 text-green-800">$8,900</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Pending Payments</span>
                <Badge variant="outline">$2,100</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Maintenance Requests</span>
                <Badge className="bg-orange-100 text-orange-800">3 Open</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Lease Renewals Due</span>
                <Badge className="bg-blue-100 text-blue-800">5 This Month</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLandlords = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Landlords Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage landlord accounts and information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Landlord
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Landlord</DialogTitle>
              <DialogDescription>
                Enter the landlord's information to create a new account.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLandlord}>
                  Add Landlord
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Total Landlords: {landlords.length}</CardTitle>
              <CardDescription>Manage all landlord accounts</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search landlords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLandlords.map((landlord) => (
              <Card key={landlord.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{landlord.name}</CardTitle>
                      <CardDescription>{landlord.email}</CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditLandlord(landlord)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLandlord(landlord.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>{landlord.phone}</p>
                    <p className="truncate">{landlord.address}</p>
                    <p className="text-xs">Joined: {landlord.createdAt}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingLandlord} onOpenChange={() => setEditingLandlord(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Landlord</DialogTitle>
            <DialogDescription>
              Update the landlord's information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email Address</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter full address"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingLandlord(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateLandlord}>
                Update Landlord
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Properties</h1>
          <p className="text-gray-600 dark:text-gray-400">View all managed properties</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Properties Management</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Properties management functionality will be available soon. This is a view-only section for now.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage all payments</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Payments Management</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Payments management functionality will be available soon. This is a view-only section for now.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'landlords':
        return renderLandlords();
      case 'properties':
        return renderProperties();
      case 'payments':
        return renderPayments();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Makazi Manager
            </h1>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900 dark:to-purple-900 dark:text-blue-300'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Top Navigation */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden mr-2"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="mr-2">
                  <Home className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-sm">
                  Welcome, Admin
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Sign with Google
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
