
//import React, {useState} from 'react';
import { Settings } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"


export default function PlanSelector() {
  //const [selectedPlan, setSelectedPlan] = useState('half-marathon-12');
  //const [raceDate, setRaceDate] = useState('');
  const selectedPlan = 'Plan number 1';

  return (
    <div className="flex items-center space-x-4">
      <Select value={selectedPlan} >{/*onValueChange={setSelectedPlan}*/}
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select training plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="half-marathon-12">Half Marathon - 12 Weeks</SelectItem>
          <SelectItem value="marathon-16">Marathon - 16 Weeks</SelectItem>
          <SelectItem value="marathon-20">Marathon - 20 Weeks</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
}