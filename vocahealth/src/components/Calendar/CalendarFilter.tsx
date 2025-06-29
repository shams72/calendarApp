'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAppointment } from "../Contexts/AppointmentContext";


interface CalendarFilterProps {
  formView?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  editView?: boolean;
  patient?: string;
  setCategory?: (value: string) => void;
}

export const CalendarFilter = ({ value, onChange, editView = false,setCategory, patient, formView=true }: CalendarFilterProps) => {
  const { categories, events, setCurrentEvents } = useAppointment();

  const handleChange = (selected: string) => {
    if (onChange) {
      
      onChange(selected); 
      return
    }

    if (!editView) {
      if(selected === "all") {
        if(patient !== "all") {
            const filtered = events.filter((event) => event.patient.id === patient);
            setCurrentEvents(filtered);
        }else {
            setCurrentEvents(events);
        }

    } else {
        const filteredPatients = events.filter((event) => event.category.id === selected);
        if(patient !== "all") {
            const filtered = filteredPatients.filter((event) => event.patient.id === patient);
            setCurrentEvents(filtered);
        }
        else {
            setCurrentEvents(filteredPatients);
        }

    }
    
    setCategory!(selected)
    }
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Kategorie auswählen" />
      </SelectTrigger>
      <SelectContent>
        {(!editView && formView) && <SelectItem value="all">Alle Kategorien</SelectItem>}
        {categories.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color || '#888' }}
              />
              {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
