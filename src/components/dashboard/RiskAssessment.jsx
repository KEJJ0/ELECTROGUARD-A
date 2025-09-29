import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function RiskAssessment({ sensorData, alerts }) {
  const calculateRiskLevel = () => {
    if (!sensorData || Object.keys(sensorData).length === 0) return 'low';
    
    let highRiskCount = 0;
    let mediumRiskCount = 0;
    
    Object.values(sensorData).forEach(data => {
      // Check critical parameters
      if (data.temperature > 85 || data.temperature < 65) highRiskCount++;
      if (data.voltage < 1.95 || data.voltage > 2.15) highRiskCount++;
      if (data.h2_purity < 99.9) highRiskCount++;
      if (data.vibration > 4) mediumRiskCount++;
      if (data.readiness < 80) mediumRiskCount++;
    });
    
    if (highRiskCount > 0) return 'high';
    if (mediumRiskCount > 2) return 'medium';
    return 'low';
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-900 border-red-800 text-red-200';
      case 'medium': return 'bg-yellow-900 border-yellow-800 text-yellow-200';
      default: return 'bg-green-900 border-green-800 text-green-200';
    }
  };

  const getRiskBadgeColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const getTopRisks = () => {
    const risks = [];
    
    Object.entries(sensorData).forEach(([id, data]) => {
      if (data.temperature > 85) {
        risks.push({
          type: 'Temperature Critical',
          unit: id,
          level: 'high',
          probability: '85%',
          timeToFailure: '2-4 hours'
        });
      }
      if (data.voltage < 1.95) {
        risks.push({
          type: 'Voltage Drop',
          unit: id,
          level: 'high',
          probability: '72%',
          timeToFailure: '6-8 hours'
        });
      }
      if (data.vibration > 4) {
        risks.push({
          type: 'Mechanical Stress',
          unit: id,
          level: 'medium',
          probability: '45%',
          timeToFailure: '24-48 hours'
        });
      }
      if (data.readiness < 75) {
        risks.push({
          type: 'Performance Degradation',
          unit: id,
          level: 'medium',
          probability: '60%',
          timeToFailure: '12-24 hours'
        });
      }
    });
    
    return risks.slice(0, 5);
  };

  const riskLevel = calculateRiskLevel();
  const topRisks = getTopRisks();

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Risk Assessment
          </div>
          <Badge className={getRiskBadgeColor(riskLevel)}>
            {riskLevel.toUpperCase()} RISK
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg border ${getRiskColor(riskLevel)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Overall System Risk</span>
            <span className="text-sm opacity-75">Updated 30s ago</span>
          </div>
          <p className="text-sm opacity-90">
            {riskLevel === 'high' && 'Immediate attention required. Critical parameters detected.'}
            {riskLevel === 'medium' && 'Monitor closely. Some parameters approaching limits.'}
            {riskLevel === 'low' && 'System operating within normal parameters.'}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Top 5 Risk Factors</h4>
          <div className="space-y-2">
            {topRisks.length > 0 ? topRisks.map((risk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${risk.level === 'high' ? 'bg-red-900 text-red-200' : 'bg-yellow-900 text-yellow-200'}`}
                    >
                      {risk.unit}
                    </Badge>
                    <span className="text-white text-sm font-medium">{risk.type}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {risk.probability}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {risk.timeToFailure}
                    </span>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-4 text-slate-400">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No significant risks detected</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}