import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Info } from "lucide-react";
import { ReactNode } from "react";

interface StepLayoutProps {
  title: string;
  description: string;
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  onComplete?: () => void;
  children: ReactNode;
  guidelines?: string[];
  isCompleted?: boolean;
}

export const StepLayout = ({
  title,
  description,
  stepNumber,
  totalSteps,
  onBack,
  onComplete,
  children,
  guidelines = [],
  isCompleted = false
}: StepLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm opacity-90">Step {stepNumber} of {totalSteps}</span>
                {isCompleted && <CheckCircle className="w-4 h-4" />}
              </div>
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Description */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Guidelines */}
        {guidelines.length > 0 && (
          <Card className="border-medical-secondary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-medical-primary">
                <Info className="w-5 h-5" />
                Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-medical-primary rounded-full mt-2 flex-shrink-0" />
                    {guideline}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="space-y-6">
          {children}
        </div>

        {/* Action Button */}
        {onComplete && (
          <div className="flex justify-end pt-4">
            <Button 
              onClick={onComplete}
              variant="medical"
              size="lg"
              className="min-w-32"
            >
              {isCompleted ? "Update Step" : "Complete Step"}
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};