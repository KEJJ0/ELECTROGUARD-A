import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Thermometer, 
  Gauge, 
  Activity,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { motion } from "framer-motion";

export default function SystemOverview({ sensorData }) {
  const electrolyzers = Object.keys(sensorData);
  
  const getOverallStats = () => {
    if (electrolyzers.length === 0) return { avgTemp: 0, avgPressure: 0, avgReadiness: 0, totalPower: 0 };
    
    const totals = electrolyzers.reduce((acc, id) => {
      const data = sensorData[id];
      return {
        temp: acc.temp + data.temperature,
        pressure: acc.pressure + data.pressure,
        readiness: acc.readiness + data.readiness,
        power: acc.power + (data.current * data.voltage)
      };
    }, { temp: 0, pressure: 0, readiness: 0, power: 0 });

    return {
      avgTemp: totals.temp / electrolyzers.length,
      avgPressure: totals.pressure / electrolyzers.length,
      avgReadiness: totals.readiness / electrolyzers.length,
      totalPower: totals.power / 1000 // Convert to kW
    };
  };

  const stats = getOverallStats();

  const StatCard = ({ title, value, unit, icon: Icon, trend, color }) => (
    <Card className="bg-slate-900/50 border-slate-800 hover:bg-slate-900/70 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-bold text-white">
                {typeof value === 'number' ? value.toFixed(1) : value}
              </span>
              <span className="text-slate-400 text-sm">{unit}</span>
              {trend && (
                <div className="flex items-center gap-1">
                  {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                  {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                  {trend === 'stable' && <Minus className="w-4 h-4 text-slate-500" />}
                </div>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Average Temperature"
        value={stats.avgTemp}
        unit="°C"
        icon={Thermometer}
        trend="stable"
        color="bg-orange-500"
      />
      <StatCard
        title="Average Pressure"
        value={stats.avgPressure}
        unit="bar"
        icon={Gauge}
        trend="up"
        color="bg-blue-500"
      />
      <StatCard
        title="System Readiness"
        value={stats.avgReadiness}
        unit="%"
        icon={Activity}
        trend="stable"
        color="bg-green-500"
      />
      <StatCard
        title="Total Power"
        value={stats.totalPower}
        unit="kW"
        icon={Zap}
        trend="up"
        color="bg-purple-500"
      />
    </div>
  );
}