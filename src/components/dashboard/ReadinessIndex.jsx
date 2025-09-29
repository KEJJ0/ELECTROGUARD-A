import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ReadinessIndex({ sensorData }) {
  const calculateOverallReadiness = () => {
    if (!sensorData || Object.keys(sensorData).length === 0) return 0;
    
    const total = Object.values(sensorData).reduce((sum, data) => sum + data.readiness, 0);
    return total / Object.keys(sensorData).length;
  };

  const getReadinessStatus = (readiness) => {
    if (readiness >= 90) return { status: 'excellent', color: 'text-green-500', bg: 'bg-green-900', icon: CheckCircle };
    if (readiness >= 80) return { status: 'good', color: 'text-green-400', bg: 'bg-green-900', icon: CheckCircle };
    if (readiness >= 70) return { status: 'fair', color: 'text-yellow-500', bg: 'bg-yellow-900', icon: AlertCircle };
    return { status: 'poor', color: 'text-red-500', bg: 'bg-red-900', icon: XCircle };
  };

  const getMaintenanceRecommendation = (readiness) => {
    if (readiness < 70) return 'Immediate maintenance required';
    if (readiness < 80) return 'Schedule maintenance within 24h';
    if (readiness < 90) return 'Routine maintenance recommended';
    return 'System operating optimally';
  };

  const overallReadiness = calculateOverallReadiness();
  const status = getReadinessStatus(overallReadiness);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Activity className="w-5 h-5" />
          System Readiness
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Readiness */}
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-slate-700"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallReadiness / 100)}`}
                className={status.color}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {overallReadiness.toFixed(0)}%
              </span>
            </div>
          </div>
          
          <Badge className={`${status.bg} border-none text-white mb-2`}>
            <status.icon className="w-3 h-3 mr-1" />
            {status.status.toUpperCase()}
          </Badge>
          
          <p className="text-sm text-slate-400">
            {getMaintenanceRecommendation(overallReadiness)}
          </p>
        </div>

        {/* Individual Units */}
        <div className="space-y-3">
          <h4 className="font-medium text-white">Unit Breakdown</h4>
          {Object.entries(sensorData).map(([unit, data]) => {
            const unitStatus = getReadinessStatus(data.readiness);
            return (
              <motion.div
                key={unit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <unitStatus.icon className={`w-4 h-4 ${unitStatus.color}`} />
                  <span className="text-white font-medium">{unit}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress 
                    value={data.readiness} 
                    className="w-20 h-2 bg-slate-700"
                  />
                  <span className="text-white font-semibold w-12 text-right">
                    {data.readiness.toFixed(0)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}