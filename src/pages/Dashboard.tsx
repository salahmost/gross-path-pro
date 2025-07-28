import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkflowCard } from "@/components/WorkflowCard";
import { 
  Microscope, 
  FileText, 
  Scissors, 
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [workflowState, setWorkflowState] = useState({
    receive: { completed: false, active: true },
    document: { completed: false, active: false },
    cut: { completed: false, active: false },
    report: { completed: false, active: false }
  });

  const workflowSteps = [
    {
      id: 'receive',
      title: 'Receive Specimen',
      description: 'Log incoming specimens, verify patient information, and assign accession numbers.',
      icon: ClipboardList,
      estimatedTime: '5-10 min',
      path: '/receive'
    },
    {
      id: 'document',
      title: 'Document Specimen',
      description: 'Record gross examination findings, measurements, and initial observations.',
      icon: FileText,
      estimatedTime: '15-30 min',
      path: '/document'
    },
    {
      id: 'cut',
      title: 'Cut & Section',
      description: 'Perform gross sectioning, select representative areas, and prepare for histology.',
      icon: Scissors,
      estimatedTime: '20-45 min',
      path: '/cut'
    },
    {
      id: 'report',
      title: 'Generate Report',
      description: 'Compile findings, create preliminary report, and prepare for microscopic examination.',
      icon: Microscope,
      estimatedTime: '30-60 min',
      path: '/report'
    }
  ];

  const handleStepStart = (stepId: string, path: string) => {
    navigate(path);
  };

  const getActiveStep = () => {
    return Object.entries(workflowState).findIndex(([_, state]) => state.active) + 1;
  };

  const getCompletedSteps = () => {
    return Object.values(workflowState).filter(state => state.completed).length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">PathologyGuide</h1>
              <p className="text-primary-foreground/90 text-lg">
                Professional specimen processing workflow
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{getCompletedSteps()}/4</div>
              <div className="text-sm opacity-90">Steps Completed</div>
            </div>
          </div>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <div className="text-lg font-semibold">Current Step</div>
                <div className="text-sm opacity-90">Step {getActiveStep()}</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                <div className="text-lg font-semibold">Completed</div>
                <div className="text-sm opacity-90">{getCompletedSteps()} steps</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <div className="text-lg font-semibold">Remaining</div>
                <div className="text-sm opacity-90">{4 - getCompletedSteps()} steps</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Specimen Processing Workflow</h2>
          <p className="text-muted-foreground">
            Follow each step in sequence to ensure proper specimen handling and documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workflowSteps.map((step, index) => {
            const stepState = workflowState[step.id as keyof typeof workflowState];
            return (
              <WorkflowCard
                key={step.id}
                title={step.title}
                description={step.description}
                stepNumber={index + 1}
                isCompleted={stepState.completed}
                isActive={stepState.active}
                onStart={() => handleStepStart(step.id, step.path)}
                estimatedTime={step.estimatedTime}
              />
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common tasks and utilities for pathologists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="medical-outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <FileText className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">Template Library</div>
                  <div className="text-xs text-muted-foreground">Standard reports</div>
                </div>
              </Button>
              <Button variant="medical-outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <ClipboardList className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">Specimen History</div>
                  <div className="text-xs text-muted-foreground">View past cases</div>
                </div>
              </Button>
              <Button variant="medical-outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">Safety Guidelines</div>
                  <div className="text-xs text-muted-foreground">Review protocols</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;