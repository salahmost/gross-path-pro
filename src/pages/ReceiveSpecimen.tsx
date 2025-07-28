import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "@/components/StepLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, User, FileText, Clock } from "lucide-react";

const ReceiveSpecimen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    accessionNumber: '',
    patientName: '',
    patientId: '',
    dateOfBirth: '',
    specimenType: '',
    clinicalHistory: '',
    requestingPhysician: '',
    priority: 'routine',
    receivedTime: new Date().toISOString().slice(0, 16)
  });

  const guidelines = [
    "Verify patient identification matches specimen container labels",
    "Check for proper specimen fixation and container integrity",
    "Assign unique accession number following laboratory protocol", 
    "Record exact time of specimen receipt",
    "Note any discrepancies or special handling requirements",
    "Ensure all required clinical information is available"
  ];

  const specimenTypes = [
    "Biopsy - Skin",
    "Biopsy - Breast", 
    "Biopsy - GI Tract",
    "Biopsy - Lung",
    "Resection - Surgical",
    "Cytology - FNA",
    "Cytology - Fluid",
    "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    if (!formData.accessionNumber || !formData.patientName || !formData.specimenType) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Specimen received successfully",
      description: `Accession #${formData.accessionNumber} logged in system.`,
      variant: "default"
    });
    
    navigate('/document');
  };

  return (
    <StepLayout
      title="Receive Specimen"
      description="Log the incoming specimen, verify patient information, and assign proper identification numbers."
      stepNumber={1}
      totalSteps={4}
      onBack={() => navigate('/')}
      onComplete={handleComplete}
      guidelines={guidelines}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                placeholder="Last, First Middle"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID *</Label>
              <Input
                id="patientId"
                value={formData.patientId}
                onChange={(e) => handleInputChange('patientId', e.target.value)}
                placeholder="Medical record number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requestingPhysician">Requesting Physician</Label>
              <Input
                id="requestingPhysician"
                value={formData.requestingPhysician}
                onChange={(e) => handleInputChange('requestingPhysician', e.target.value)}
                placeholder="Dr. Smith"
              />
            </div>
          </CardContent>
        </Card>

        {/* Specimen Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Specimen Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessionNumber">Accession Number *</Label>
              <div className="flex gap-2">
                <Input
                  id="accessionNumber"
                  value={formData.accessionNumber}
                  onChange={(e) => handleInputChange('accessionNumber', e.target.value)}
                  placeholder="S24-12345"
                />
                <Button variant="medical-outline" size="sm">
                  Generate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specimenType">Specimen Type *</Label>
              <Select value={formData.specimenType} onValueChange={(value) => handleInputChange('specimenType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specimen type" />
                </SelectTrigger>
                <SelectContent>
                  {specimenTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="stat">STAT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="receivedTime">Time Received</Label>
              <Input
                id="receivedTime"
                type="datetime-local"
                value={formData.receivedTime}
                onChange={(e) => handleInputChange('receivedTime', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Clinical Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              Clinical History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="clinicalHistory">Clinical History & Indication</Label>
              <Textarea
                id="clinicalHistory"
                value={formData.clinicalHistory}
                onChange={(e) => handleInputChange('clinicalHistory', e.target.value)}
                placeholder="Enter relevant clinical history, symptoms, previous diagnoses, and reason for biopsy..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="lg:col-span-2 bg-medical-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Reception Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <Badge variant="secondary">
                  {formData.accessionNumber ? 'Ready for Documentation' : 'Pending Information'}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Priority</div>
                <Badge variant={formData.priority === 'stat' ? 'destructive' : formData.priority === 'urgent' ? 'default' : 'secondary'}>
                  {formData.priority.toUpperCase()}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Next Step</div>
                <div className="font-medium">Gross Documentation</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StepLayout>
  );
};

export default ReceiveSpecimen;