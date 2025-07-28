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
import { Ruler, Eye, FileText, Camera } from "lucide-react";

const DocumentSpecimen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    grossWeight: '',
    dimensions: '',
    color: '',
    consistency: '',
    surface: '',
    grossDescription: '',
    photographs: false,
    fixationType: 'formalin',
    fixationTime: ''
  });

  const guidelines = [
    "Measure and weigh specimens accurately using calibrated equipment",
    "Describe gross appearance systematically (size, color, consistency, surface)",
    "Note any unusual features, lesions, or areas of concern",
    "Take photographs before sectioning when indicated",
    "Document fixation type and duration",
    "Use standardized terminology for consistency"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    if (!formData.dimensions || !formData.grossDescription) {
      toast({
        title: "Required fields missing",
        description: "Please complete measurements and gross description.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Documentation completed",
      description: "Gross examination findings have been recorded.",
      variant: "default"
    });
    
    navigate('/cut');
  };

  const consistencyOptions = ["Soft", "Firm", "Hard", "Rubbery", "Friable", "Necrotic"];
  const colorOptions = ["Pink", "Tan", "Brown", "Gray", "Yellow", "Red", "White", "Black"];
  const surfaceOptions = ["Smooth", "Rough", "Nodular", "Ulcerated", "Intact", "Irregular"];

  return (
    <StepLayout
      title="Document Specimen"
      description="Record detailed gross examination findings including measurements, appearance, and descriptive characteristics."
      stepNumber={2}
      totalSteps={4}
      onBack={() => navigate('/receive')}
      onComplete={handleComplete}
      guidelines={guidelines}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Measurements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="w-5 h-5" />
              Measurements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions (L x W x H in cm) *</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => handleInputChange('dimensions', e.target.value)}
                placeholder="2.5 x 1.8 x 0.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grossWeight">Weight (grams)</Label>
              <Input
                id="grossWeight"
                type="number"
                step="0.1"
                value={formData.grossWeight}
                onChange={(e) => handleInputChange('grossWeight', e.target.value)}
                placeholder="12.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fixation Type</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={formData.fixationType}
                  onChange={(e) => handleInputChange('fixationType', e.target.value)}
                >
                  <option value="formalin">10% Formalin</option>
                  <option value="alcohol">Alcohol</option>
                  <option value="mercury">Mercury-based</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fixationTime">Fixation Time (hours)</Label>
                <Input
                  id="fixationTime"
                  type="number"
                  value={formData.fixationTime}
                  onChange={(e) => handleInputChange('fixationTime', e.target.value)}
                  placeholder="6"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gross Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Gross Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <Button
                    key={color}
                    variant={formData.color === color ? "medical" : "medical-outline"}
                    size="sm"
                    onClick={() => handleInputChange('color', color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Consistency</Label>
              <div className="flex flex-wrap gap-2">
                {consistencyOptions.map((consistency) => (
                  <Button
                    key={consistency}
                    variant={formData.consistency === consistency ? "medical" : "medical-outline"}
                    size="sm"
                    onClick={() => handleInputChange('consistency', consistency)}
                  >
                    {consistency}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Surface</Label>
              <div className="flex flex-wrap gap-2">
                {surfaceOptions.map((surface) => (
                  <Button
                    key={surface}
                    variant={formData.surface === surface ? "medical" : "medical-outline"}
                    size="sm"
                    onClick={() => handleInputChange('surface', surface)}
                  >
                    {surface}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Description */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Gross Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="grossDescription">Detailed Gross Description *</Label>
              <Textarea
                id="grossDescription"
                value={formData.grossDescription}
                onChange={(e) => handleInputChange('grossDescription', e.target.value)}
                placeholder="The specimen consists of... Describe systematically including overall appearance, lesions, margins, and areas of interest..."
                rows={6}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-medical-secondary/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5" />
                <div>
                  <div className="font-medium">Photography</div>
                  <div className="text-sm text-muted-foreground">Document specimen before sectioning</div>
                </div>
              </div>
              <Button 
                variant={formData.photographs ? "success" : "medical-outline"}
                onClick={() => handleInputChange('photographs', !formData.photographs)}
              >
                {formData.photographs ? "Photos Taken" : "Take Photos"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Summary */}
        <Card className="lg:col-span-2 bg-medical-secondary/20">
          <CardHeader>
            <CardTitle>Documentation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Measurements</div>
                <div className="font-medium">{formData.dimensions || 'Pending'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Weight</div>
                <div className="font-medium">{formData.grossWeight ? `${formData.grossWeight}g` : 'Not recorded'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Fixation</div>
                <div className="font-medium">{formData.fixationType}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Photos</div>
                <Badge variant={formData.photographs ? "success" : "secondary"}>
                  {formData.photographs ? "Completed" : "Pending"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StepLayout>
  );
};

export default DocumentSpecimen;