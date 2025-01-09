import { useState } from "react";
import VinInput from "@/components/VinInput";
import VehicleInfo from "@/components/VehicleInfo";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<any>(null);
  const { toast } = useToast();

  const handleVinSubmit = async (vin: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle data');
      }

      // Extract relevant information from NHTSA response
      const results = data.Results;
      const vehicleInfo = {
        make: results.find((item: any) => item.Variable === "Make")?.Value,
        model: results.find((item: any) => item.Variable === "Model")?.Value,
        year: results.find((item: any) => item.Variable === "Model Year")?.Value,
        engine: results.find((item: any) => item.Variable === "Engine Model")?.Value,
        transmission: results.find((item: any) => item.Variable === "Transmission Style")?.Value,
        bodyStyle: results.find((item: any) => item.Variable === "Body Class")?.Value,
        driveTrain: results.find((item: any) => item.Variable === "Drive Type")?.Value,
        fuelType: results.find((item: any) => item.Variable === "Fuel Type - Primary")?.Value,
      };

      // Check if we got any meaningful data
      const hasData = Object.values(vehicleInfo).some(value => value && value !== "Not Applicable");
      
      if (!hasData) {
        toast({
          variant: "destructive",
          title: "Vehicle Not Found",
          description: "This VIN may be from a non-US market vehicle. This service primarily works with vehicles sold in the United States.",
        });
        setVehicleData(null);
      } else {
        setVehicleData(vehicleInfo);
        toast({
          title: "Success",
          description: "Vehicle information retrieved successfully",
        });
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch vehicle information. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Vehicle Information Lookup
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Enter your Vehicle Identification Number (VIN) to get detailed information
          </p>
          <p className="text-sm text-muted-foreground">
            Note: This service primarily works with vehicles sold in the United States market. 
            International vehicles may have limited or no information available.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <VinInput onSubmit={handleVinSubmit} isLoading={isLoading} />
          
          {isLoading && (
            <div className="w-full max-w-2xl animate-pulse">
              <div className="h-64 bg-muted rounded-lg" />
            </div>
          )}

          {!isLoading && vehicleData && <VehicleInfo data={vehicleData} />}
        </div>
      </div>
    </div>
  );
};

export default Index;