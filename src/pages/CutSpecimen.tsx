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
import { Scissors, MapPin, Grid, Shield } from "lucide-react";

const CutSpecimen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sections, setSections] = useState([
    { id: 1, location: '', description: '', cassette: '' }
  ]);
  const [formData, setFormData] = useState({
    sectioningProtocol: '',
    orientation: '',
    margins: '',
    specialStains: '',
    notes: ''
  });

  const guidelines = [
    "Orient specimen properly to show relevant anatomical relationships",
    "Take representative sections from all areas of interest",
    "Include margins when applicable for surgical specimens",
    "Document exact location of each section taken",
    "Use proper cassette labeling system",
    "Consider special stains or additional studies needed"
  ];

  const addSection = () => {
    setSections(prev => [...prev, { 
      id: prev.length + 1, 
      location: '', 
      description: '', 
      cassette: `${String.fromCharCode(65 + prev.length)}` 
    }]);
  };

  const updateSection = (id: number, field: string, value: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const handleComplete = () => {
    const incompleteSections = sections.filter(s => !s.location || !s.description);
    if (incompleteSections.length > 0) {
      toast({
        title: "Incomplete sections",
        description: "Please complete all section descriptions and locations.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sectioning completed",
      description: `${sections.length} sections prepared for histology.`,
      variant: "default"
    });
    
    navigate('/report');
  };

  return (
    <StepLayout
      title="Cut & Section Specimen"
      description="Perform gross sectioning, select representative areas, and prepare tissue blocks for histological examination."
      stepNumber={3}
      totalSteps={4}
      onBack={() => navigate('/document')}
      onComplete={handleComplete}
      guidelines={guidelines}
    >
      <div className="space-y-6">
        {/* Sectioning Protocol */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="w-5 h-5" />
              Sectioning Protocol
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orientation">Specimen Orientation</Label>
                <Input
                  id="orientation"
                  value={formData.orientation}
                  onChange={(e) => setFormData(prev => ({ ...prev, orientation: e.target.value }))}
                  placeholder="e.g., Superior to inferior, anterior surface marked"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="margins">Margin Assessment</Label>
                <Input
                  id="margins"
                  value={formData.margins}
                  onChange={(e) => setFormData(prev => ({ ...prev, margins: e.target.value }))}
                  placeholder="e.g., All margins appear clear grossly"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sectioningProtocol">Sectioning Protocol</Label>
              <Textarea
                id="sectioningProtocol"
                value={formData.sectioningProtocol}
                onChange={(e) => setFormData(prev => ({ ...prev, sectioningProtocol: e.target.value }))}
                placeholder="Describe the systematic approach to sectioning this specimen..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sections Taken */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid className="w-5 h-5" />
              Representative Sections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sections.map((section, index) => (
              <Card key={section.id} className="bg-medical-secondary/10">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Cassette ID</Label>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{`Section ${String.fromCharCode(65 + index)}`}</Badge>
                        <Input
                          value={section.cassette}
                          onChange={(e) => updateSection(section.id, 'cassette', e.target.value)}
                          placeholder="A1"
                          className="w-20"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={section.location}
                        onChange={(e) => updateSection(section.id, 'location', e.target.value)}
                        placeholder="e.g., Central area with lesion"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={section.description}
                        onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                        placeholder="e.g., Representative section showing..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addSection}
              className="w-full"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Add Another Section
            </Button>
          </CardContent>
        </Card>

        {/* Special Considerations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Special Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="specialStains">Special Stains or Studies</Label>
              <Textarea
                id="specialStains"
                value={formData.specialStains}
                onChange={(e) => setFormData(prev => ({ ...prev, specialStains: e.target.value }))}
                placeholder="List any special stains, immunohistochemistry, or molecular studies that may be needed..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional observations or special handling notes..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sectioning Summary */}
        <Card className="bg-medical-secondary/20">
          <CardHeader>
            <CardTitle>Sectioning Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Total Sections</div>
                <div className="text-2xl font-bold text-medical-primary">{sections.length}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Cassettes</div>
                <div className="font-medium">
                  {sections.map(s => s.cassette || `${String.fromCharCode(65 + sections.indexOf(s))}`).join(', ')}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Next Step</div>
                <Badge variant="secondary">Histology Processing</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StepLayout>
  );
};

export default CutSpecimen;