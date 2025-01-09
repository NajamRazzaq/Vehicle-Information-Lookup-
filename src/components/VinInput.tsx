import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VinInputProps {
  onSubmit: (vin: string) => void;
  isLoading?: boolean;
}

const VinInput = ({ onSubmit, isLoading = false }: VinInputProps) => {
  const [vin, setVin] = useState("");

  const validateVin = (vin: string) => {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return vinRegex.test(vin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!vin) {
      toast.error("Please enter a VIN number");
      return;
    }

    if (!validateVin(vin)) {
      toast.error("Please enter a valid 17-character VIN");
      return;
    }

    onSubmit(vin);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="relative">
        <Input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          placeholder="Enter VIN (e.g., 1HGCM82633A123456)"
          className="h-12 text-lg placeholder:text-muted-foreground/60"
          maxLength={17}
        />
        <div className="absolute right-3 top-3 text-sm text-muted-foreground">
          {vin.length}/17
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full h-12 text-lg font-semibold"
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search VIN"}
      </Button>
    </form>
  );
};

export default VinInput;