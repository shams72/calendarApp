'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAppointment } from "../Contexts/AppointmentContext";


interface PatientFilterProps {
  sort?:boolean;
  value?: string;
  setPatient?: (value: string) => void;
  onChange?: (value: string) => void;
}

export const PatientFilter = ({ value, onChange,sort=false, setPatient}: PatientFilterProps) => {
  const { patients, currentEvents, setCurrentEvents, events, setEvents} = useAppointment();

  const handleChange = (selected: string) => {
    
    if(sort) {
      if(currentEvents.length!==0) {
        const filtered = currentEvents.filter((event) => event.patient.id === selected);
        setPatient!(selected);
        setCurrentEvents(filtered);
      } else {
        const filtered = events.filter((event) => event.patient.id === selected);
        setEvents(filtered);
        setPatient!(selected);
      }
      return
    }

    if (onChange) {
      onChange(selected); 
      return
    }

  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Patient auswählen" />
      </SelectTrigger>
      <SelectContent>
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
