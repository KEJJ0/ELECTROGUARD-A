import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  Calendar,
  Download,
  Filter
} from "lucide-react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [analyticsData, setAnalyticsData] = useState({});
  const [section, setSection] = useState("performance"); // 👈 تبويب المحتوى كـ Pills

  useEffect(() => {
    // Generate sample analytics data
    const generateAnalyticsData = () => {
      const hours = Array.from({ length: 24 }, (_, i) => {
        const time = new Date();
        time.setHours(time.getHours() - (23 - i));
        return time.toISOString();
      });

      const temperatureData = hours.map(time => ({
        time: new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        'ELZ-001': 65 + Math.random() * 20,
        'ELZ-002': 68 + Math.random() * 18,
        'ELZ-003': 62 + Math.random() * 22,
        'ELZ-004': 70 + Math.random() * 15,
      }));

      const pressureData = hours.map(time => ({
        time: new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        'ELZ-001': 18 + Math.random() * 8,
        'ELZ-002': 16 + Math.random() * 10,
        'ELZ-003': 20 + Math.random() * 6,
        'ELZ-004': 17 + Math.random() * 9,
      }));

      const readinessData = [
        { name: 'ELZ-001', readiness: 92, fill: '#10b981' },
        { name: 'ELZ-002', readiness: 87, fill: '#f59e0b' },
        { name: 'ELZ-003', readiness: 95, fill: '#10b981' },
        { name: 'ELZ-004', readiness: 83, fill: '#f59e0b' },
      ];

      const failurePrediction = [
        { component: 'Electrodes', probability: 15, timeframe: '7 days' },
        { component: 'Membrane', probability: 8, timeframe: '14 days' },
        { component: 'Gas Separator', probability: 22, timeframe: '3 days' },
        { component: 'Power Supply', probability: 5, timeframe: '21 days' },
      ];

      return {
        temperature: temperatureData,
        pressure: pressureData,
        readiness: readinessData,
        failurePrediction
      };
    };

    setAnalyticsData(generateAnalyticsData());
    
    const interval = setInterval(() => {
      setAnalyticsData(generateAnalyticsData());
    }, 30000);

    return () => clearInterval(interval);
  }, [timeRange]);

  return (
    <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
  <div>
    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
      AI Analytics & Insights
    </h1>
    <p className="text-slate-400 mt-1">Advanced predictive analytics and performance trends</p>
  </div>

  <div className="flex items-center gap-3">
    {/* Filters — نفس ستايل Export */}
    <Button
      variant="outline"
      className="h-10 px-3 bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 border border-slate-200"
    >
      <Filter className="w-4 h-4 mr-2" />
      Filters
    </Button>

    <Button
      variant="outline"
      className="h-10 px-3 bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 border border-slate-200"
    >
      <Download className="w-4 h-4 mr-2" />
      Export
    </Button>
  </div>
</div>

        {/* Time Range Selection — على هيئة Pills */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-4">
            <Tabs value={timeRange} onValueChange={setTimeRange}>
              <TabsList className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
             <TabsTrigger
  value="1h"
  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
>
  1 Hour
</TabsTrigger>

              <TabsTrigger
  value="6h" 
  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
>
  6 Hours 
</TabsTrigger>

              <TabsTrigger
  value="24h" 
  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
>
  24 Hours 
</TabsTrigger>

               <TabsTrigger
  value="7d" 
  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
>
  7 days
</TabsTrigger>

              <TabsTrigger
  value="30d" 
  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
>
  30 days
</TabsTrigger>

              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Analytics Content — تبويبات على شكل Pills */}
        <Tabs value={section} onValueChange={setSection} className="space-y-6">
          <TabsList className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
           <TabsTrigger
  value="performance" 
  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
>
  Performance Trends
</TabsTrigger>

           <TabsTrigger
  value="predictive" 
  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
>
 Predictive Analysis
</TabsTrigger>

            <TabsTrigger
  value="efficiency" 
  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
             !bg-slate-600 !text-white hover:!text-black
             data-[state=active]:!bg-slate-500 data-[state=active]:!text-white
             focus-visible:ring-0 focus-visible:ring-offset-0"
>
Efficiency Metrics
</TabsTrigger>

          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            {/* Temperature Trends */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="w-5 h-5" />
                  Temperature Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.temperature}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="ELZ-001" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="ELZ-002" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="ELZ-003" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="ELZ-004" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pressure Trends */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5" />
                  Pressure Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.pressure}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="ELZ-001" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="ELZ-002" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="ELZ-003" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="ELZ-004" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Failure Prediction */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <AlertTriangle className="w-5 h-5" />
                    AI Failure Prediction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.failurePrediction?.map((prediction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{prediction.component}</p>
                          <p className="text-slate-400 text-sm">Predicted in {prediction.timeframe}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            className={`${
                              prediction.probability > 20 
                                ? 'bg-red-900 text-red-200' 
                                : prediction.probability > 10 
                                ? 'bg-yellow-900 text-yellow-200' 
                                : 'bg-green-900 text-green-200'
                            }`}
                          >
                            {prediction.probability}% Risk
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Readiness Index */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="w-5 h-5" />
                    Unit Readiness Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analyticsData.readiness}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="readiness" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="efficiency" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Efficiency Metrics Cards */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">H₂ Production Rate</p>
                      <p className="text-2xl font-bold text-white">847 kg/day</p>
                      <p className="text-green-400 text-sm">↑ 12% from last week</p>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <Activity className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Energy Efficiency</p>
                      <p className="text-2xl font-bold text-white">72.3%</p>
                      <p className="text-yellow-400 text-sm">↓ 2% from last week</p>
                    </div>
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Uptime</p>
                      <p className="text-2xl font-bold text-white">98.7%</p>
                      <p className="text-green-400 text-sm">↑ 0.3% from last week</p>
                    </div>
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
