import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "@/components/StepLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Eye, Send } from "lucide-react";

const GenerateReport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [report, setReport] = useState({
    clinicalHistory: '',
    grossDescription: '',
    microscopicDescription: '',
    diagnosis: '',
    comment: '',
    recommendations: ''
  });

  const guidelines = [
    "Review all previous documentation for accuracy and completeness",
    "Provide clear, concise clinical history summary",
    "Include detailed but relevant gross findings",
    "Prepare framework for microscopic examination",
    "Ensure proper medical terminology and formatting",
    "Include any recommendations for additional studies"
  ];

  const handleInputChange = (field: string, value: string) => {
    setReport(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    if (!report.clinicalHistory || !report.grossDescription) {
      toast({
        title: "Required sections missing",
        description: "Please complete clinical history and gross description.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report generated successfully",
      description: "Preliminary pathology report is ready for review.",
      variant: "default"
    });
    
    navigate('/');
  };

  const generatePreview = () => {
    toast({
      title: "Report preview generated",
      description: "Opening formatted report preview...",
      variant: "default"
    });
  };

  return (
    <StepLayout
      title="Generate Report"
      description="Compile all findings into a comprehensive preliminary pathology report ready for microscopic examination."
      stepNumber={4}
      totalSteps={4}
      onBack={() => navigate('/cut')}
      onComplete={handleComplete}
      guidelines={guidelines}
    >
      <div className="space-y-6">
        {/* Clinical Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Clinical Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clinicalHistory">Clinical History *</Label>
              <Textarea
                id="clinicalHistory"
                value={report.clinicalHistory}
                onChange={(e) => handleInputChange('clinicalHistory', e.target.value)}
                placeholder="Summarize relevant clinical history, presenting symptoms, and indication for biopsy..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Gross Findings */}
        <Card>
          <CardHeader>
            <CardTitle>Gross Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="grossDescription">Gross Examination *</Label>
              <Textarea
                id="grossDescription"
                value={report.grossDescription}
                onChange={(e) => handleInputChange('grossDescription', e.target.value)}
                placeholder="The specimen consists of... Include measurements, appearance, and sectioning details..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Microscopic Framework */}
        <Card>
          <CardHeader>
            <CardTitle>Microscopic Examination Framework</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="microscopicDescription">Microscopic Description</Label>
              <Textarea
                id="microscopicDescription"
                value={report.microscopicDescription}
                onChange={(e) => handleInputChange('microscopicDescription', e.target.value)}
                placeholder="To be completed after microscopic examination... (This section will be filled after slide review)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosis">Preliminary Diagnosis</Label>
              <Textarea
                id="diagnosis"
                value={report.diagnosis}
                onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                placeholder="Pending microscopic examination..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                value={report.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
                placeholder="Additional interpretive comments, clinical correlation, or explanatory notes..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recommendations">Recommendations</Label>
              <Textarea
                id="recommendations"
                value={report.recommendations}
                onChange={(e) => handleInputChange('recommendations', e.target.value)}
                placeholder="Clinical follow-up recommendations, additional studies, or consultation suggestions..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Report Actions */}
        <Card className="bg-medical-secondary/20">
          <CardHeader>
            <CardTitle>Report Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="medical-outline" onClick={generatePreview} className="h-auto p-4 flex flex-col items-center gap-2">
                <Eye className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">Preview Report</div>
                  <div className="text-xs text-muted-foreground">Formatted view</div>
                </div>
              </Button>

              <Button variant="medical-outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Download className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">Export Draft</div>
                  <div className="text-xs text-muted-foreground">Save as PDF</div>
                </div>
              </Button>

              <Button variant="medical-outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Send className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold">Send to LIS</div>
                  <div className="text-xs text-muted-foreground">Laboratory system</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Status */}
        <Card className="bg-medical-secondary/20">
          <CardHeader>
            <CardTitle>Report Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <Badge variant="warning">Preliminary</Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Completion</div>
                <div className="font-medium">Gross Complete</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Next Step</div>
                <div className="font-medium">Microscopy</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Turnaround</div>
                <div className="font-medium">24-48 hours</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StepLayout>
  );
};

export default GenerateReport;