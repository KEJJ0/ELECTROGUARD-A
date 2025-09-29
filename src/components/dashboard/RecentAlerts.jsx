import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Clock,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function RecentAlerts({ alerts }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-900 text-red-200 border-red-800';
      case 'high': return 'bg-red-900 text-red-200 border-red-800';
      case 'medium': return 'bg-yellow-900 text-yellow-200 border-yellow-800';
      default: return 'bg-blue-900 text-blue-200 border-blue-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="w-5 h-5" />
            Recent Alerts
          </CardTitle>
          <Link to={createPageUrl("Alerts")}>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-start justify-between p-4 bg-slate-800/30 rounded-lg border-l-4 border-l-slate-600"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          {alert.electrolyzer_id}
                        </Badge>
                        <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-white text-sm font-medium mb-1">
                        {alert.message}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {format(alert.timestamp, 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white ml-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No recent alerts</p>
              <p className="text-sm mt-1">System operating normally</p>
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}