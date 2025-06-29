'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAppointment } from "../Contexts/AppointmentContext";


interface PatientSelectorProps {
  setPatient: (value: string) => void;
  category: string;
}

export const PatientSelector = ({ setPatient, category}: PatientSelectorProps) => {
  const { patients,  setCurrentEvents, events} = useAppointment();

  const handleChange = (selected: string) => {

    
    if(selected === "all") {
        if(category !== "all") {
            const filtered = events.filter((event) => event.category.id === category);
            setCurrentEvents(filtered);
        }else {
                    setCurrentEvents(events);
        }

    }else {
        const filteredCategory = events.filter((event) => event.patient.id === selected);
        if(category !== "all") {
            const filtered = filteredCategory.filter((event) => event.category.id === category);
            setCurrentEvents(filtered);
        }
        else {
            setCurrentEvents(filteredCategory);
        }

    }
    
    setPatient(selected)

    

  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Patient auswählen" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={"all"} value={"all"}>
            <p className="flex items-center gap-2">
               Alle Patienten
            </p>
        </SelectItem>
        {patients.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            <div className="flex items-center gap-2">
              {item.firstname} {item.lastname}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
