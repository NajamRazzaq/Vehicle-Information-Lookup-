import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VehicleInfoProps {
  data: {
    make?: string;
    model?: string;
    year?: string;
    engine?: string;
    transmission?: string;
    bodyStyle?: string;
    driveTrain?: string;
    fuelType?: string;
  };
}

const VehicleInfo = ({ data }: VehicleInfoProps) => {
  const specs = [
    { label: "Make", value: data.make },
    { label: "Model", value: data.model },
    { label: "Year", value: data.year },
    { label: "Engine", value: data.engine },
    { label: "Transmission", value: data.transmission },
    { label: "Body Style", value: data.bodyStyle },
    { label: "Drive Train", value: data.driveTrain },
    { label: "Fuel Type", value: data.fuelType },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Vehicle Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="p-4 bg-secondary rounded-lg"
            >
              <div className="text-sm text-muted-foreground">{spec.label}</div>
              <div className="text-lg font-semibold mt-1">
                {spec.value || "N/A"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleInfo;