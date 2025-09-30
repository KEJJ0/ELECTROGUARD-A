import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Gauge, 
  Zap, 
  Activity, 
  Droplets, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SystemOverview from "../components/dashboard/SystemOverview.jsx"
import SensorGrid     from "../components/dashboard/SensorGrid.jsx"
import RiskAssessment from "../components/dashboard/RiskAssessment.jsx"
import ReadinessIndex from "../components/dashboard/ReadinessIndex.jsx"
import RecentAlerts   from "../components/dashboard/RecentAlerts.jsx"

export default function Dashboard() {
  const [sensorData, setSensorData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [systemStatus, setSystemStatus] = useState({});
  const [isConnected, setIsConnected] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const generateSensorData = () => {
      const electrolyzers = ['ELZ-001', 'ELZ-002', 'ELZ-003', 'ELZ-004'];
      const data = {};
      
      electrolyzers.forEach(id => {
        // Generate realistic sensor readings with some variance
        data[id] = {
          temperature: 65 + Math.random() * 25, // 65-90°C
          pressure: 15 + Math.random() * 15, // 15-30 bar
          current: 180 + Math.random() * 40, // 180-220 A
          voltage: 1.9 + Math.random() * 0.3, // 1.9-2.2 V
          vibration: 2 + Math.random() * 3, // 2-5 Hz
          h2_purity: 99.85 + Math.random() * 0.14, // 99.85-99.99%
          koh_concentration: 22 + Math.random() * 6, // 22-28%
          readiness: 75 + Math.random() * 20, // 75-95%
          trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable'
        };
      });
      
      return data;
    };

    const generateAlerts = () => {
      const alertTypes = [
        { type: 'temperature', message: 'Temperature approaching upper limit', severity: 'medium' },
        { type: 'vibration', message: 'Unusual vibration pattern detected', severity: 'high' },
        { type: 'predictive', message: 'AI predicts maintenance needed in 48h', severity: 'medium' },
      ];
      
      return alertTypes.slice(0, Math.floor(Math.random() * 3) + 1).map(alert => ({
        ...alert,
        id: Math.random().toString(36).substr(2, 9),
        electrolyzer_id: `ELZ-00${Math.floor(Math.random() * 4) + 1}`,
        timestamp: new Date()
      }));
    };

    // Initial data load
    setSensorData(generateSensorData());
    setAlerts(generateAlerts());

    // Set up real-time updates
    const interval = setInterval(() => {
      setSensorData(generateSensorData());
      
      // Occasionally generate new alerts
      if (Math.random() > 0.8) {
        setAlerts(generateAlerts());
      }
    }, 2000);

    // Simulate connection status
    const connectionInterval = setInterval(() => {
      setIsConnected(prev => Math.random() > 0.1 ? true : prev);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(connectionInterval);
    };
  }, []);

  return (
    <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Live Monitoring Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Real-time electrolyzer performance & predictive analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm text-slate-400">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <Badge variant="secondary" className="bg-slate-800 text-slate-300">
              Last Update: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* System Overview */}
        <SystemOverview sensorData={sensorData} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sensor Readings */}
          <div className="lg:col-span-2">
            <SensorGrid sensorData={sensorData} />
          </div>

          {/* Risk Assessment & Readiness */}
          <div className="space-y-6">
            <RiskAssessment sensorData={sensorData} alerts={alerts} />
            <ReadinessIndex sensorData={sensorData} />
          </div>
        </div>

        {/* Recent Alerts */}
        <RecentAlerts alerts={alerts} />
      </div>
    </div>
  );

}
