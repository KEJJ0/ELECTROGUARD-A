import React, { useState, useEffect } from "react";
import maintenanceActions from "@/Entities/MaintenanceAction.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus,
  CheckCircle,
  AlertTriangle,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function Maintenance() {
  const [maintenanceActions, setMaintenanceActions] = useState([]);
  const [showNewActionForm, setShowNewActionForm] = useState(false);
  const [newAction, setNewAction] = useState({
    electrolyzer_id: '',
    action_type: 'preventive',
    description: '',
    priority: 'medium',
    estimated_duration: '',
    scheduled_date: null,
    assigned_to: ''
  });

  useEffect(() => {
    loadMaintenanceActions();
  }, []);

  const loadMaintenanceActions = async () => {
    // Simulate loading maintenance actions
    const mockActions = [
      {
        id: '1',
        electrolyzer_id: 'ELZ-001',
        action_type: 'preventive',
        description: 'Routine electrode cleaning and inspection',
        priority: 'medium',
        estimated_duration: 4,
        scheduled_date: new Date(Date.now() + 24 * 60 * 60000), // Tomorrow
        status: 'pending',
        assigned_to: 'John Smith',
        created_date: new Date(Date.now() - 60 * 60000)
      },
      {
        id: '2',
        electrolyzer_id: 'ELZ-003',
        action_type: 'corrective',
        description: 'Vibration sensor calibration and mechanical inspection',
        priority: 'high',
        estimated_duration: 6,
        scheduled_date: new Date(Date.now() + 4 * 60 * 60000), // In 4 hours
        status: 'in_progress',
        assigned_to: 'Maria Garcia',
        created_date: new Date(Date.now() - 2 * 60 * 60000)
      },
      {
        id: '3',
        electrolyzer_id: 'ELZ-002',
        action_type: 'preventive',
        description: 'KOH electrolyte replacement and pH adjustment',
        priority: 'medium',
        estimated_duration: 8,
        scheduled_date: new Date(Date.now() - 24 * 60 * 60000), // Yesterday
        status: 'completed',
        assigned_to: 'Alex Johnson',
        created_date: new Date(Date.now() - 3 * 24 * 60 * 60000)
      }
    ];
    
    setMaintenanceActions(mockActions);
  };

  const handleCreateAction = async () => {
    const action = {
      ...newAction,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      created_date: new Date()
    };
    
    setMaintenanceActions(prev => [...prev, action]);
    setShowNewActionForm(false);
    setNewAction({
      electrolyzer_id: '',
      action_type: 'preventive',
      description: '',
      priority: 'medium',
      estimated_duration: '',
      scheduled_date: null,
      assigned_to: ''
    });
  };

  const updateActionStatus = (actionId, newStatus) => {
    setMaintenanceActions(prev => prev.map(action => 
      action.id === actionId ? { ...action, status: newStatus } : action
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-red-400';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-900 text-green-200';
      case 'in_progress': return 'bg-blue-900 text-blue-200';
      case 'pending': return 'bg-yellow-900 text-yellow-200';
      default: return 'bg-gray-900 text-gray-200';
    }
  };

  const getActionTypeIcon = (type) => {
    switch (type) {
      case 'emergency': return '🚨';
      case 'corrective': return '🔧';
      default: return '📋';
    }
  };

  const filteredActions = (status) => {
    if (status === 'all') return maintenanceActions;
    return maintenanceActions.filter(action => action.status === status);
  };
  
const tabBtn =
  "rounded-lg px-4 py-2 border transition-colors duration-200 \
   bg-gray-600 text-white border-gray-600 \
   hover:bg-white hover:text-black hover:border-gray-300 \
   data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-white \
   focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40";


  return (
    <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Maintenance Management
            </h1>
            <p className="text-slate-400 mt-1">Schedule and track maintenance activities</p>
          </div>
          <Button
            onClick={() => setShowNewActionForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </Button>
        </div>

     {/* Quick Stats */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <Card className="bg-slate-900/50 border-slate-800">
    <CardContent className="p-6 text-center">
      <div className="text-2xl font-bold text-amber-400 mb-1">
        {filteredActions('pending').length}
      </div>
      <div className="text-amber-300/90 text-sm">Pending</div>
    </CardContent>
  </Card>

  <Card className="bg-slate-900/50 border-slate-800">
    <CardContent className="p-6 text-center">
      <div className="text-2xl font-bold text-sky-400 mb-1">
        {filteredActions('in_progress').length}
      </div>
      <div className="text-sky-300/90 text-sm">In Progress</div>
    </CardContent>
  </Card>

  <Card className="bg-slate-900/50 border-slate-800">
    <CardContent className="p-6 text-center">
      <div className="text-2xl font-bold text-emerald-400 mb-1">
        {filteredActions('completed').length}
      </div>
      <div className="text-emerald-300/90 text-sm">Completed</div>
    </CardContent>
  </Card>

  <Card className="bg-slate-900/50 border-slate-800">
    <CardContent className="p-6 text-center">
      <div className="text-2xl font-bold text-rose-400 mb-1">
        {filteredActions('all').filter(a => a.priority === 'high' || a.priority === 'critical').length}
      </div>
      <div className="text-rose-300/90 text-sm">High Priority</div>
    </CardContent>
  </Card>
</div>

        {/* New Action Form */}
        <AnimatePresence>
          {showNewActionForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Schedule New Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Electrolyzer Unit</label>
                      <Select value={newAction.electrolyzer_id} onValueChange={(value) => setNewAction({...newAction, electrolyzer_id: value})}>
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ELZ-001">ELZ-001</SelectItem>
                          <SelectItem value="ELZ-002">ELZ-002</SelectItem>
                          <SelectItem value="ELZ-003">ELZ-003</SelectItem>
                          <SelectItem value="ELZ-004">ELZ-004</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Action Type</label>
                      <Select value={newAction.action_type} onValueChange={(value) => setNewAction({...newAction, action_type: value})}>
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="preventive">Preventive</SelectItem>
                          <SelectItem value="corrective">Corrective</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 text-sm mb-2 block">Description</label>
                    <Textarea
                      placeholder="Describe the maintenance action..."
                      className="bg-slate-800 border-slate-700 text-white"
                      value={newAction.description}
                      onChange={(e) => setNewAction({...newAction, description: e.target.value})}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Priority</label>
                      <Select value={newAction.priority} onValueChange={(value) => setNewAction({...newAction, priority: value})}>
                        <SelectTrigger className="bg-slate-800 border-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Duration (hours)</label>
                      <Input
                        type="number"
                        placeholder="4"
                        className="bg-slate-800 border-slate-700 text-white"
                        value={newAction.estimated_duration}
                        onChange={(e) => setNewAction({...newAction, estimated_duration: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm mb-2 block">Assigned To</label>
                      <Input
                        placeholder="Technician name"
                        className="bg-slate-800 border-slate-700 text-white"
                        value={newAction.assigned_to}
                        onChange={(e) => setNewAction({...newAction, assigned_to: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 text-sm mb-2 block">Scheduled Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="border-slate-700 text-slate-300">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newAction.scheduled_date ? format(newAction.scheduled_date, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newAction.scheduled_date}
                          onSelect={(date) => setNewAction({...newAction, scheduled_date: date})}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setShowNewActionForm(false)} className="border-slate-700 text-slate-300">
                      Cancel
                    </Button>
                    <Button onClick={handleCreateAction} className="bg-blue-600 hover:bg-blue-700">
                      Schedule Action
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Maintenance Actions Tabs */}
        <Tabs defaultValue="pending">
          <TabsList className="bg-transparent text-slate-300 p-1 flex flex-wrap gap-2">
            <TabsTrigger value="pending">Pending ({filteredActions('pending').length})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({filteredActions('in_progress').length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({filteredActions('completed').length})</TabsTrigger>
            <TabsTrigger value="all">All Actions ({maintenanceActions.length})</TabsTrigger>
          </TabsList>

          {['pending', 'in_progress', 'completed', 'all'].map(tabValue => (
            <TabsContent key={tabValue} value={tabValue} className="mt-6">
              <div className="space-y-4">
                {filteredActions(tabValue).map((action) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-lg">{getActionTypeIcon(action.action_type)}</span>
                              <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                                {action.electrolyzer_id}
                              </Badge>
                              <Badge className={getPriorityColor(action.priority)}>
                                {action.priority.toUpperCase()}
                              </Badge>
                              <Badge className={getStatusColor(action.status)}>
                                {action.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>

                            <h3 className="text-white font-semibold text-lg mb-2">
                              {action.description}
                            </h3>

                            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-400">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Duration: {action.estimated_duration}h</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>Scheduled: {format(action.scheduled_date, 'MMM d, yyyy')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>Assigned: {action.assigned_to}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            {action.status === 'pending' && (
                              <Button
                                onClick={() => updateActionStatus(action.id, 'in_progress')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Start Work
                              </Button>
                            )}
                            {action.status === 'in_progress' && (
                              <Button
                                onClick={() => updateActionStatus(action.id, 'completed')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );

}
