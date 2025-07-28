import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";

interface WorkflowCardProps {
  title: string;
  description: string;
  stepNumber: number;
  isCompleted: boolean;
  isActive: boolean;
  onStart: () => void;
  estimatedTime?: string;
}

export const WorkflowCard = ({
  title,
  description,
  stepNumber,
  isCompleted,
  isActive,
  onStart,
  estimatedTime
}: WorkflowCardProps) => {
  return (
    <Card className={`relative overflow-hidden transition-all duration-200 ${
      isActive ? 'ring-2 ring-medical-primary shadow-medical' : 
      isCompleted ? 'bg-medical-secondary/20' : 'hover:shadow-card-custom'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              isCompleted ? 'bg-success text-success-foreground' : 
              isActive ? 'bg-medical-primary text-primary-foreground' : 
              'bg-muted text-muted-foreground'
            }`}>
              {isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-semibold">{stepNumber}</span>
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {estimatedTime && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  ~{estimatedTime}
                </Badge>
              )}
            </div>
          </div>
          {isCompleted && (
            <CheckCircle className="w-6 h-6 text-success" />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="mb-4 text-sm leading-relaxed">
          {description}
        </CardDescription>
        <Button 
          onClick={onStart}
          variant={isActive ? "medical" : isCompleted ? "medical-outline" : "default"}
          className="w-full group"
          disabled={!isActive && !isCompleted}
        >
          {isCompleted ? "Review Step" : isActive ? "Start Step" : "Locked"}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};