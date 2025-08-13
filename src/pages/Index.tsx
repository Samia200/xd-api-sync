import { useState } from "react";
import { Search, Settings, Activity, Thermometer, Heart, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PatientCard } from "@/components/PatientCard";
import { VitalCard } from "@/components/VitalCard";
import { BloodPressureChart } from "@/components/BloodPressureChart";
import { DiagnosticTable } from "@/components/DiagnosticTable";
import { LabResults } from "@/components/LabResults";
import { usePatientData } from "@/hooks/usePatientData";

const Index = () => {
  const { patientData, loading, error } = usePatientData();
  const [selectedTimeframe, setSelectedTimeframe] = useState("Last 6 months");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !patientData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Error Loading Patient Data</h1>
          <p className="text-muted-foreground">{error || "Patient data not found"}</p>
        </div>
      </div>
    );
  }

  // Process chart data from the latest 6 months
  const chartData = patientData.diagnosis_history.slice(-6).map(entry => ({
    month: `${entry.month.slice(0, 3)} ${entry.year}`,
    systolic: entry.blood_pressure.systolic.value,
    diastolic: entry.blood_pressure.diastolic.value,
  }));

  // Get latest vital signs
  const latestVitals = patientData.diagnosis_history[patientData.diagnosis_history.length - 1];

  // Mock patient list data (showing only Jessica as selected)
  const patients = [
    {
      name: "Emily Williams",
      gender: "Female", 
      age: 18,
      profilePicture: "",
      isSelected: false
    },
    {
      name: "Ryan Johnson", 
      gender: "Male",
      age: 45,
      profilePicture: "",
      isSelected: false
    },
    {
      name: "Brandon Mitchell",
      gender: "Male", 
      age: 36,
      profilePicture: "",
      isSelected: false
    },
    {
      name: patientData.name,
      gender: patientData.gender,
      age: new Date().getFullYear() - new Date(patientData.date_of_birth).getFullYear(),
      profilePicture: patientData.profile_picture,
      isSelected: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Tech.Care</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-muted-foreground hover:text-foreground">Overview</a>
            <a href="#" className="text-primary font-medium bg-primary/10 px-4 py-2 rounded-full">Patients</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Schedule</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Message</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Transactions</a>
          </nav>

          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt="Dr. Jose Simmons" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="font-medium">Dr. Jose Simmons</p>
              <p className="text-sm text-muted-foreground">General Practitioner</p>
            </div>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Patient List */}
        <aside className="w-80 bg-card border-r h-[calc(100vh-80px)] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Patients</h2>
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-2">
              {patients.map((patient, index) => (
                <PatientCard
                  key={index}
                  name={patient.name}
                  gender={patient.gender}
                  age={patient.age}
                  profilePicture={patient.profilePicture}
                  isSelected={patient.isSelected}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Diagnosis History */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Diagnosis History</CardTitle>
                    <select 
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="text-sm border border-border rounded px-3 py-1 bg-background"
                    >
                      <option>Last 6 months</option>
                      <option>Last year</option>
                      <option>Last 2 years</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Blood Pressure</h3>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-systolic"></div>
                        <span className="text-sm">Systolic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-chart-diastolic"></div>
                        <span className="text-sm">Diastolic</span>
                      </div>
                    </div>
                    <BloodPressureChart data={chartData} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-chart-systolic">
                        {latestVitals.blood_pressure.systolic.value}
                      </div>
                      <div className="text-sm text-muted-foreground">Systolic</div>
                      <div className="text-sm">{latestVitals.blood_pressure.systolic.levels}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-chart-diastolic">
                        {latestVitals.blood_pressure.diastolic.value}
                      </div>
                      <div className="text-sm text-muted-foreground">Diastolic</div>
                      <div className="text-sm">{latestVitals.blood_pressure.diastolic.levels}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vital Signs Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <VitalCard
                  icon={<Wind className="h-6 w-6" />}
                  title="Respiratory Rate"
                  value={latestVitals.respiratory_rate.value.toString()}
                  unit="bpm"
                  status={latestVitals.respiratory_rate.levels}
                  bgColor="bg-health-respiratory"
                  iconColor="text-health-respiratory-foreground"
                />
                <VitalCard
                  icon={<Thermometer className="h-6 w-6" />}
                  title="Temperature"
                  value={latestVitals.temperature.value.toString()}
                  unit="°F"
                  status={latestVitals.temperature.levels}
                  bgColor="bg-health-temperature"
                  iconColor="text-health-temperature-foreground"
                />
                <VitalCard
                  icon={<Heart className="h-6 w-6" />}
                  title="Heart Rate"
                  value={latestVitals.heart_rate.value.toString()}
                  unit="bpm"
                  status={latestVitals.heart_rate.levels}
                  bgColor="bg-health-heart"
                  iconColor="text-health-heart-foreground"
                />
              </div>

              {/* Diagnostic Table */}
              <DiagnosticTable diagnostics={patientData.diagnostic_list} />
            </div>

            {/* Right Sidebar - Patient Profile */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="h-32 w-32 mx-auto mb-4">
                    <AvatarImage src={patientData.profile_picture} alt={patientData.name} />
                    <AvatarFallback className="text-2xl">
                      {patientData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-6">{patientData.name}</h3>
                  
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        📅
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date Of Birth</p>
                        <p className="font-medium">{new Date(patientData.date_of_birth).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        👤
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-medium">{patientData.gender}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        📞
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contact Info.</p>
                        <p className="font-medium">{patientData.phone_number}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        📞
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Emergency Contacts</p>
                        <p className="font-medium">{patientData.emergency_contact}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        🏥
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Insurance Provider</p>
                        <p className="font-medium">{patientData.insurance_type}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                    Show All Information
                  </Button>
                </CardContent>
              </Card>

              {/* Lab Results */}
              <LabResults labResults={patientData.lab_results.map(result => ({ name: result }))} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
