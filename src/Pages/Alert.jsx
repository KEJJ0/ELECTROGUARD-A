import React, { useState, useEffect } from "react";
import alertData from "@/Entities/Alert.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Filter,
  Search,
  Bell,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAlerts();
  }, []);

  useEffect(() => {
    // Move filtering logic directly into useEffect
    let filtered = alerts;

    if (activeTab === 'active') {
      filtered = alerts.filter(alert => !alert.is_acknowledged);
    } else if (activeTab === 'acknowledged') {
      filtered = alerts.filter(alert => alert.is_acknowledged);
    } else if (activeTab === 'all') { // Added 'all' tab logic
      filtered = alerts;
    }

    if (searchTerm) {
      filtered = filtered.filter(alert => 
        alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.electrolyzer_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAlerts(filtered);
  }, [alerts, activeTab, searchTerm]);

  const loadAlerts = async () => {
    // Simulate loading alerts
    const mockAlerts = [
      {
        id: '1',
        electrolyzer_id: 'ELZ-001',
        alert_type: 'temperature',
        severity: 'high',
        message: 'Temperature approaching critical threshold (89°C)',
        recommended_action: 'Reduce current by 15% within 30 minutes',
        is_acknowledged: false,
        created_date: new Date(Date.now() - 30 * 60000) // 30 minutes ago
      },
      {
        id: '2',
        electrolyzer_id: 'ELZ-003',
        alert_type: 'vibration',
        severity: 'medium',
        message: 'Unusual vibration pattern detected (4.2 Hz)',
        recommended_action: 'Schedule mechanical inspection within 48 hours',
        is_acknowledged: false,
        created_date: new Date(Date.now() - 45 * 60000) // 45 minutes ago
      },
      {
        id: '3',
        electrolyzer_id: 'ELZ-002',
        alert_type: 'predictive',
        severity: 'medium',
        message: 'AI predicts electrode degradation in 72 hours',
        recommended_action: 'Plan electrode replacement maintenance',
        is_acknowledged: true,
        acknowledged_by: 'john.doe@facility.com',
        created_date: new Date(Date.now() - 2 * 60 * 60000) // 2 hours ago
      },
      {
        id: '4',
        electrolyzer_id: 'ELZ-004',
        alert_type: 'h2_purity',
        severity: 'critical',
        message: 'Hydrogen purity dropped to 99.85%',
        recommended_action: 'Immediate purification system check required',
        is_acknowledged: false,
        created_date: new Date(Date.now() - 10 * 60000) // 10 minutes ago
      },
      {
        id: '5',
        electrolyzer_id: 'ELZ-001',
        alert_type: 'pressure',
        severity: 'low',
        message: 'Pressure below optimal operating range (5.1 bar)',
        recommended_action: 'Check pump functionality and adjust settings',
        is_acknowledged: false,
        created_date: new Date(Date.now() - 5 * 60000) // 5 minutes ago
      }
    ];
    
    setAlerts(mockAlerts);
  };

  const acknowledgeAlert = async (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, is_acknowledged: true, acknowledged_by: 'current.user@facility.com' }
        : alert
    ));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-red-400';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500'; // Added low severity color
      default: return 'bg-gray-500'; // Default for undefined severity
    }
  };

  const getSeverityBorder = (severity) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-red-400';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500'; // Added low severity border
      default: return 'border-l-gray-500'; // Default for undefined severity
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'temperature': return '🌡️';
      case 'pressure': return '⏲️';
      case 'vibration': return '📳';
      case 'h2_purity': return '💧';
      case 'predictive': return '🔮';
      default: return '⚠️';
    }
  };

  // عدّاد الـ Active لعرضه في الشارة الحمراء
  const activeCount = alerts.filter(a => !a.is_acknowledged).length;

  return (
    <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Alert Management
            </h1>
            <p className="text-slate-400 mt-1">Monitor and manage system alerts & notifications</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-rose-600 text-white font-bold h-8 px-2.5 rounded-full">
              {activeCount} Active
            </Badge>
            <Button
              variant="outline"
              className="h-9 px-4 bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 shadow-sm"
            >
              <Bell className="w-4 h-4 mr-2 text-slate-700" />
              Configure Alerts
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search alerts..."
                    className="pl-10 bg-slate-950/70 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-slate-400/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                className="h-9 px-4 bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 shadow-sm"
              >
                <Filter className="w-4 h-4 mr-2 text-slate-700" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert Tabs على شكل Pills */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
  <TabsTrigger
    value="active"
   className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
  >
    Active Alerts
  </TabsTrigger>

  <TabsTrigger
    value="acknowledged"
    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
  >
    Acknowledged
  </TabsTrigger>

  <TabsTrigger
    value="all"
   className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
  >
    All Alerts
  </TabsTrigger>
</TabsList>


          <TabsContent value={activeTab} className="mt-6">
            <AnimatePresence mode="wait">
              {filteredAlerts.length > 0 ? (
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card className={`bg-slate-900/60 border-slate-800 border-l-4 ${getSeverityBorder(alert.severity)} hover:bg-slate-900/80 transition-colors`}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl">{getAlertIcon(alert.alert_type)}</span>
                                <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                                  {alert.electrolyzer_id}
                                </Badge>
                                <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                                  {alert.severity.toUpperCase()}
                                </Badge>
                                <span className="text-slate-400 text-sm">
                                  {format(alert.created_date, 'MMM d, h:mm a')}
                                </span>
                              </div>
                              
                              <h3 className="text-white font-semibold text-lg mb-2">
                                {alert.message}
                              </h3>
                              
                              <div className="bg-slate-800/50 p-3 rounded-lg mb-3">
                                <p className="text-cyan-400 text-sm font-medium mb-1">Recommended Action:</p>
                                <p className="text-slate-300 text-sm">{alert.recommended_action}</p>
                              </div>

                              {alert.is_acknowledged && (
                                <div className="flex items-center gap-2 text-green-400 text-sm">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Acknowledged by {alert.acknowledged_by}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-2 ml-4">
                              {!alert.is_acknowledged && (
                               <Button
  onClick={() => acknowledgeAlert(alert.id)}
  className="h-9 px-4 !bg-emerald-600 !text-white hover:!bg-emerald-500 active:!bg-emerald-700 shadow-sm"
>
  <CheckCircle className="w-4 h-4 mr-2" />
  Acknowledge
</Button>

                              )}
                              <Button
                                variant="outline"
                                className="group h-9 px-4 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 shadow-sm"
                              >
                                <ExternalLink className="w-4 h-4 mr-2 text-slate-600 group-hover:text-slate-800" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-12 text-center">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-slate-400 opacity-50" />
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">No alerts found</h3>
                    <p className="text-slate-400">
                      {activeTab === 'active' ? 'All systems operating normally' : 'No alerts match your current filters'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
