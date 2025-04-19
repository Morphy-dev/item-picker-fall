
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface ResultsModalProps {
  open: boolean;
  goodItemsCollected: number;
  maxAttempts: number;
  onNext: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ 
  open, 
  goodItemsCollected,
  maxAttempts,
  onNext,
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center font-comic-sans text-2xl">
            Your Results
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl text-green-500 mb-2">
                <Check className="w-12 h-12" />
              </div>
              <p className="text-lg">{goodItemsCollected}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl text-red-500 mb-2">
                <X className="w-12 h-12" />
              </div>
              <p className="text-lg">{maxAttempts - goodItemsCollected}</p>
            </div>
          </div>
        </div>
        <Button 
          onClick={onNext}
          className="w-full"
        >
          Next
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;
