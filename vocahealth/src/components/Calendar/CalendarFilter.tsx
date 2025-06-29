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
  value?: string;
  onChange?: (value: string) => void;
  editView?: boolean;
  category?: string;
}

export const CalendarFilter = ({ value, onChange, editView = false }: CalendarFilterProps) => {
  const { categories, events, setCurrentEvents } = useAppointment();

  const handleChange = (selected: string) => {
    if (onChange) {
      
      onChange(selected); 
      return
    }

    if (!editView) {
      if (selected === 'all') {
      
        setCurrentEvents(events);

      } else {
        const filtered = events.filter((event) => event.category.id === selected);
      
        setCurrentEvents(filtered);
      }
    }
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Kategorie auswählen" />
      </SelectTrigger>
      <SelectContent>
        {!editView && <SelectItem value="all">All</SelectItem>}
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
