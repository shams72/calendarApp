import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { differenceInCalendarDays,format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { useAppointment } from '../Contexts/AppointmentContext';
import { Category } from '@/types/appointments';
import { Patient,AppointmentData } from '@/types/appointments';
import { CalendarDays, Clock, MapPin } from "lucide-react"; // shadcn uses lucide icons
import { User } from "lucide-react";
import { Tag } from "lucide-react";
import { Edit2, Trash2, Info } from "lucide-react";


interface Appointments {
  id: string;
  created_at: string;        
  updated_at: string | null; 
  start: string;             
  end: string;              
  location: string;
  patient: Patient;         
  attachements: string | null; 
  category: Category;          
  notes: string;
  title: string;
  color?: Category['color'];
}


interface EventCardProps {
  event:Appointments;
  badge: boolean;
  setEditMode?: (open: boolean) => void;
  disabled?:boolean;
  setAppointmentView?: (open: boolean) => void;
  setAppointmentData?:(data:AppointmentData) => void;
}


const EventCard: React.FC<EventCardProps> = ({ event, badge, setEditMode, setAppointmentView, setAppointmentData, disabled=false}) => {
  
  const {deleteAppointment} = useAppointment()
  

  const startDate = event.start ? new Date(event.start) : null;
  const endDate = event.end ? new Date(event.end) : startDate;

  const formattedStart = startDate ? format(startDate, 'MMM d, yyyy') : '';
  const formattedEnd = endDate ? format(endDate, 'MMM d, yyyy') : '';

  const daysDuration = startDate && endDate 
    ? differenceInCalendarDays(endDate, startDate) + 1 
    : 1;

  const formattedStartTime = startDate ? format(startDate, 'hh:mm a') : '';
  const formattedEndTime = endDate ? format(endDate, 'hh:mm a') : '';

  const disabledClass = disabled===true?"opacity-50 pointer-events-none select-none":"";
  
  const selectedEvent :AppointmentData = {
    id:event.id,
    patient:event.patient.id,
    location: event.location,   
    eventTitle: event.title,
    start: event.start,
    end: event.end,
    category: event.category.id,
    notes: event.notes,
  };

  return (
    <>  
    <Card key={event.id}  className={`relative mt-0 mb-3 ${disabledClass}`}>
      {badge && <div className='absolute left-85 top-2'>
        <Button variant="ghost" size="icon" title={event.notes} className="hover:bg-muted">  <Info className="w-5 h-5" /> </Button>
        <Button variant="ghost" size="icon" title="Edit" className="hover:bg-muted" onClick={() => {setEditMode?.(true); setAppointmentView?.(true);setAppointmentData?.(selectedEvent)}}>  <Edit2 className="w-5 h-5" />   </Button>
        <Button variant="ghost" size="icon" title="Delete" className="text-red-500 hover:bg-red-100" onClick={() => deleteAppointment(event.id)}> <Trash2 className="w-5 h-5" /> </Button>
      </div>}
      <CardContent className="flex gap-4 py-2 px-5 items-center mt-0 min-w-0">
      
        <div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: event.category?.color || '#888' }}
        />

       <div className="flex flex-col justify-center space-y-0.5 flex-1 min-w-0 overflow-hidden">
        <div className="flex items-center space-x-2 text-sm font-semibold truncate" title={`${event.title} | ${event.patient.firstname} ${event.patient.lastname}`}>
          

          <User className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{event.patient.firstname} {event.patient.lastname}</span>
          <span className="text-muted-foreground">|</span>
          <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{event.title}</span>
        </div>

        <div className="text-xs text-muted-foreground whitespace-normal flex items-center gap-1">
          <CalendarDays className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          {formattedStart} | {formattedStartTime} {daysDuration > 1 ? `(${daysDuration} days)` : ''}
        </div>

        <div className="text-xs text-muted-foreground whitespace-normal flex items-center gap-1">
          <Clock className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
          {formattedEnd} | {formattedEndTime} {daysDuration > 1 ? `(${daysDuration} days)` : ''}
        </div>

        {event.location && (
          <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
            <MapPin className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            {event.location}
          </div>
        )}
      </div>

        {badge && event.category?.label && (
          <Badge variant="secondary" className="text-xs whitespace-nowrap ml-2">
            {event.category.label}
          </Badge>
        )}
      </CardContent>
    

    </Card>
  
</>
  );
};

export default EventCard;
