import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  TrendingUp,
  Activity,
  AlertTriangle,
  Settings,
  BarChart3
} from "lucide-react";
import { format, subDays } from "date-fns";
import { motion } from "framer-motion";

export default function Reports() {
  const [reportType, setReportType] = useState('performance');
  const [dateRange, setDateRange] = useState({ from: subDays(new Date(), 7), to: new Date() });
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [reportData, setReportData] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generateReportData();
  }, [reportType, Range, selectedUnit]);

  const generateReportData = () => {
    // Simulate report data generation
    const performanceData = {
      summary: {
        totalUptime: 98.7,
        avgTemperature: 73.2,
        avgPressure: 22.4,
        totalH2Production: 847,
        energyEfficiency: 72.3,
        alertsGenerated: 12,
        maintenanceActions: 5
      },
      unitBreakdown: [
        { unit: 'ELZ-001', uptime: 99.2, h2Production: 215, efficiency: 74.1 },
        { unit: 'ELZ-002', uptime: 98.8, h2Production: 210, efficiency: 73.2 },
        { unit: 'ELZ-003', uptime: 97.9, h2Production: 202, efficiency: 70.8 },
        { unit: 'ELZ-004', uptime: 99.1, h2Production: 220, efficiency: 71.1 }
      ],
      trends: {
        temperatureAvg: [72.1, 73.5, 74.2, 73.8, 72.9, 73.2, 73.4],
        pressureAvg: [22.1, 22.3, 22.8, 22.5, 22.2, 22.4, 22.6],
        efficiencyAvg: [71.8, 72.1, 72.5, 72.8, 72.3, 72.0, 72.3]
      }
    };

    const complianceData = {
      summary: {
        overallCompliance: 96.8,
        temperatureViolations: 2,
        pressureViolations: 0,
        purityViolations: 1,
        voltageViolations: 1
      },
      details: [
        { parameter: 'Temperature (60-90°C)', compliance: 98.2, violations: 2 },
        { parameter: 'Pressure (15-30 bar)', compliance: 100.0, violations: 0 },
        { parameter: 'H₂ Purity (≥99.9%)', compliance: 99.4, violations: 1 },
        { parameter: 'Voltage (1.9-2.2V)', compliance: 97.8, violations: 1 },
        { parameter: 'KOH Concentration (20-30%)', compliance: 100.0, violations: 0 }
      ]
    };

    setReportData({ performance: performanceData, compliance: complianceData });
  };

  const downloadReport = async (format) => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reportContent = generateReportContent();
    
    if (format === 'pdf') {
      // Simulate PDF download
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `electrolyzer-report-${format(new (), 'yyyy-MM-dd')}.txt`;
      a.click();
    } else if (format === 'excel') {
      // Simulate Excel download
      const csvContent = convertToCSV(reportData[reportType]);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `electrolyzer-report-${format(new (), 'yyyy-MM-dd')}.csv`;
      a.click();
    }
    
    setIsGenerating(false);
  };

  const generateReportContent = () => {
    const data = reportData[reportType];
    if (!data) return '';
    
    return `
ELECTROLYZER MONITORING REPORT
Generated: ${format(new (), 'PPP')}
Report Type: ${reportType.toUpperCase()}
 Range: ${format(Range.from, 'MMM d, yyyy')} - ${format(Range.to, 'MMM d, yyyy')}

SUMMARY:
${Object.entries(data.summary || {}).map(([key, value]) => 
  `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: ${value}${typeof value === 'number' && value < 100 && key.includes('percentage') ? '%' : ''}`
).join('\n')}

${data.unitBreakdown ? `
UNIT BREAKDOWN:
${data.unitBreakdown.map(unit => 
  `${unit.unit}: Uptime ${unit.uptime}%, Production ${unit.h2Production}kg, Efficiency ${unit.efficiency}%`
).join('\n')}` : ''}

${data.details ? `
COMPLIANCE DETAILS:
${data.details.map(detail => 
  `${detail.parameter}: ${detail.compliance}% compliance, ${detail.violations} violations`
).join('\n')}` : ''}
    `;
  };

  const convertToCSV = (data) => {
    if (!data) return '';
    
    const headers = ['Metric', 'Value'];
    const rows = Object.entries(data.summary || {}).map(([key, value]) => [
      key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      value
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const PerformanceReport = () => {
    const data = reportData.performance;
    if (!data) return null;

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{data.summary.totalUptime}%</div>
              <div className="text-slate-400 text-sm">System Uptime</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{data.summary.totalH2Production}</div>
              <div className="text-slate-400 text-sm">H₂ Production (kg)</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{data.summary.energyEfficiency}%</div>
              <div className="text-slate-400 text-sm">Energy Efficiency</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{data.summary.avgTemperature}°C</div>
              <div className="text-slate-400 text-sm">Avg Temperature</div>
            </CardContent>
          </Card>
        </div>

        {/* Unit Breakdown */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Unit Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.unitBreakdown.map((unit, index) => (
                <motion.div
                  key={unit.unit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      {unit.unit}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-white font-semibold">{unit.uptime}%</div>
                      <div className="text-slate-400">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-semibold">{unit.h2Production}kg</div>
                      <div className="text-slate-400">Production</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-semibold">{unit.efficiency}%</div>
                      <div className="text-slate-400">Efficiency</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const ComplianceReport = () => {
    const data = reportData.compliance;
    if (!data) return null;

    return (
      <div className="space-y-6">
        {/* Compliance Overview */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <span>Compliance Overview</span>
              <Badge className={data.summary.overallCompliance >= 95 ? 'bg-green-500' : 'bg-yellow-500'}>
                {data.summary.overallCompliance}% Compliant
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{data.summary.temperatureViolations}</div>
                <div className="text-slate-400 text-sm">Temperature Violations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{data.summary.pressureViolations}</div>
                <div className="text-slate-400 text-sm">Pressure Violations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{data.summary.purityViolations}</div>
                <div className="text-slate-400 text-sm">Purity Violations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{data.summary.voltageViolations}</div>
                <div className="text-slate-400 text-sm">Voltage Violations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parameter Compliance Details */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Parameter Compliance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.details.map((detail, index) => (
                <motion.div
                  key={detail.parameter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{detail.parameter}</h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${detail.compliance >= 99 ? 'text-green-400' : detail.compliance >= 95 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {detail.compliance}%
                      </div>
                      <div className="text-slate-400 text-xs">Compliance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-400">{detail.violations}</div>
                      <div className="text-slate-400 text-xs">Violations</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              System Reports
            </h1>
            <p className="text-slate-400 mt-1">Generate comprehensive system reports and analytics</p>
          </div>
          <div className="flex items-center gap-3">
<Button
  onClick={() => downloadReport('excel')}
  disabled={isGenerating}
  className="!bg-gray-600 !text-white !border !border-gray-600
             hover:!bg-white hover:!text-black hover:!border-gray-300
             transition-colors"
>
  <Download className="w-4 h-4 mr-2" />
  {isGenerating ? 'Generating...' : 'Excel'}
</Button>

<Button
  onClick={() => downloadReport('pdf')}
  disabled={isGenerating}
  className="!bg-gray-600 !text-white !border !border-gray-600
             hover:!bg-white hover:!text-black hover:!border-gray-300
             transition-colors"
>
  <FileText className="w-4 h-4 mr-2" />
  {isGenerating ? 'Generating...' : 'PDF'}
</Button>

          </div>
        </div>

        {/* Report Configuration */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Report Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="!bg-gray-600 !text-white !border !border-gray-600
                           hover:!bg-white hover:!text-black hover:!border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance Report</SelectItem>
                    <SelectItem value="compliance">Compliance Report</SelectItem>
                    <SelectItem value="maintenance">Maintenance Report</SelectItem>
                    <SelectItem value="alerts">Alert Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-sm mb-2 block">Electrolyzer Unit</label>
                <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                   <SelectTrigger className="!bg-gray-600 !text-white !border !border-gray-600
                           hover:!bg-white hover:!text-black hover:!border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Units</SelectItem>
                    <SelectItem value="ELZ-001">ELZ-001</SelectItem>
                    <SelectItem value="ELZ-002">ELZ-002</SelectItem>
                    <SelectItem value="ELZ-003">ELZ-003</SelectItem>
                    <SelectItem value="ELZ-004">ELZ-004</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-sm mb-2 block"> dateRange</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="!bg-gray-600 !text-white !border !border-gray-600
                           hover:!bg-white hover:!text-black hover:!border-gray-300">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd")} - {format(dateRange.to, "LLL dd")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Content */}
       <Tabs value={reportType} onValueChange={setReportType}>
  <TabsList className="bg-transparent text-slate-300">
    <TabsTrigger
      value="performance"
      className="rounded-lg px-4 py-2 border transition-colors duration-200
                 !bg-gray-600 !text-white !border-gray-600
                 hover:!bg-white hover:!text-black hover:!border-gray-300
                 data-[state=active]:!bg-white data-[state=active]:!text-black data-[state=active]:!border-white"
    >
      Performance
    </TabsTrigger>

    <TabsTrigger
      value="compliance"
      className="rounded-lg px-4 py-2 border transition-colors duration-200
                 !bg-gray-600 !text-white !border-gray-600
                 hover:!bg-white hover:!text-black hover:!border-gray-300
                 data-[state=active]:!bg-white data-[state=active]:!text-black data-[state=active]:!border-white"
    >
      Compliance
    </TabsTrigger>

    <TabsTrigger
      value="maintenance"
      className="rounded-lg px-4 py-2 border transition-colors duration-200
                 !bg-gray-600 !text-white !border-gray-600
                 hover:!bg-white hover:!text-black hover:!border-gray-300
                 data-[state=active]:!bg-white data-[state=active]:!text-black data-[state=active]:!border-white"
    >
      Maintenance
    </TabsTrigger>

    <TabsTrigger
      value="alerts"
      className="rounded-lg px-4 py-2 border transition-colors duration-200
                 !bg-gray-600 !text-white !border-gray-600
                 hover:!bg-white hover:!text-black hover:!border-gray-300
                 data-[state=active]:!bg-white data-[state=active]:!text-black data-[state=active]:!border-white"
    >
      Alerts
    </TabsTrigger>
  </TabsList>

  <TabsContent value="performance" className="mt-6">
    <PerformanceReport />
  </TabsContent>

  <TabsContent value="compliance" className="mt-6">
    <ComplianceReport />
  </TabsContent>

  <TabsContent value="maintenance" className="mt-6">
    <Card className="bg-slate-900/50 border-slate-800">
      <CardContent className="p-12 text-center">
        <Settings className="w-16 h-16 mx-auto mb-4 text-slate-400 opacity-50" />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">Maintenance Report</h3>
        <p className="text-slate-400">Maintenance reporting is currently under development.</p>
      </CardContent>
    </Card>
  </TabsContent>

  <TabsContent value="alerts" className="mt-6">
    <Card className="bg-slate-900/50 border-slate-800">
      <CardContent className="p-12 text-center">
        <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-400 opacity-50" />
        <h3 className="text-xl font-semibold text-slate-300 mb-2">Alert Summary Report</h3>
        <p className="text-slate-400">Alert reporting is currently under development.</p>
      </CardContent>
    </Card>
  </TabsContent>
</Tabs>
      </div>
    </div>
  );

}





