import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Gauge, 
  Zap, 
  Activity, 
  Droplets,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

const OPERATIONAL_LIMITS = {
  temperature: { min: 60, max: 90, unit: '°C' },
  pressure: { min: 15, max: 30, unit: 'bar' },
  voltage: { min: 1.9, max: 2.2, unit: 'V' },
  h2_purity: { min: 99.9, max: 100, unit: '%' },
  koh_concentration: { min: 20, max: 30, unit: 'wt%' },
  vibration: { min: 0, max: 5, unit: 'Hz' }
};

export default function SensorGrid({ sensorData }) {
  const getSensorStatus = (value, limits) => {
    const range = limits.max - limits.min;
    const position = (value - limits.min) / range;
    
    if (position < 0.2 || position > 0.8) return 'critical';
    if (position < 0.3 || position > 0.7) return 'warning';
    return 'normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'critical': return <Badge className="bg-red-900 text-red-200">Critical</Badge>;
      case 'warning': return <Badge className="bg-yellow-900 text-yellow-200">Warning</Badge>;
      default: return <Badge className="bg-green-900 text-green-200">Normal</Badge>;
    }
  };

  const SensorCard = ({ electrolyzer, data }) => {
    const tempStatus = getSensorStatus(data.temperature, OPERATIONAL_LIMITS.temperature);
    const pressureStatus = getSensorStatus(data.pressure, OPERATIONAL_LIMITS.pressure);
    const voltageStatus = getSensorStatus(data.voltage, OPERATIONAL_LIMITS.voltage);
    
    const overallStatus = [tempStatus, pressureStatus, voltageStatus].includes('critical') ? 'critical' : 
                         [tempStatus, pressureStatus, voltageStatus].includes('warning') ? 'warning' : 'normal';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-all duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-white">{electrolyzer}</CardTitle>
              {getStatusBadge(overallStatus)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Temperature */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className={`w-4 h-4 ${getStatusColor(tempStatus)}`} />
                <span className="text-slate-300 text-sm">Temperature</span>
              </div>
              <span className={`font-semibold ${getStatusColor(tempStatus)}`}>
                {data.temperature.toFixed(1)}°C
              </span>
            </div>
            
            {/* Pressure */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className={`w-4 h-4 ${getStatusColor(pressureStatus)}`} />
                <span className="text-slate-300 text-sm">Pressure</span>
              </div>
              <span className={`font-semibold ${getStatusColor(pressureStatus)}`}>
                {data.pressure.toFixed(1)} bar
              </span>
            </div>
            
            {/* Voltage */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className={`w-4 h-4 ${getStatusColor(voltageStatus)}`} />
                <span className="text-slate-300 text-sm">Voltage</span>
              </div>
              <span className={`font-semibold ${getStatusColor(voltageStatus)}`}>
                {data.voltage.toFixed(2)} V
              </span>
            </div>
            
            {/* H2 Purity */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-500" />
                <span className="text-slate-300 text-sm">H₂ Purity</span>
              </div>
              <span className="font-semibold text-cyan-400">
                {data.h2_purity.toFixed(2)}%
              </span>
            </div>
            
            {/* Vibration */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-500" />
                <span className="text-slate-300 text-sm">Vibration</span>
              </div>
              <span className="font-semibold text-purple-400">
                {data.vibration.toFixed(1)} Hz
              </span>
            </div>

            {/* Readiness Progress */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-xs">Readiness Index</span>
                <span className="text-white font-semibold">{data.readiness.toFixed(0)}%</span>
              </div>
              <Progress 
                value={data.readiness} 
                className="h-2 bg-slate-800"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Electrolyzer Units</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(sensorData).map(([electrolyzer, data]) => (
          <SensorCard key={electrolyzer} electrolyzer={electrolyzer} data={data} />
        ))}
      </div>
    </div>
  );
}