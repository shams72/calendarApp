'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Category } from '@/types/appointments';
import { FormSchema } from '@/types/appointments';
import { Appointments } from '@/types/appointments';
import { Patient } from '@/types/appointments'; 
import { UpdateSchema } from '@/types/appointments';

interface AppointmentContextType {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  events: Appointments[];
  setEvents: (events: Appointments[]) => void;
  currentEvents: Appointments[];
  setCurrentEvents: (events: Appointments[]) => void;
  deleteAppointment: (id: string) => void;
  addAppointment: (data:FormSchema) => void;
  editAppointment: (data:UpdateSchema) => void;
  fetchAppointments: (start:string, end:string) => void;
  patients: Patient[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Appointments[]>([]);
  const [currentEvents, setCurrentEvents] = useState<Appointments[]>([]);
  const [patients, setPatients] = useState<Patient[]>([])

  async function fetchAppointments(start:string, end:string) {
    try {

        const res = await fetch(`/api/appointments?start=${start}&end=${end}`);
        if (!res.ok) throw new Error('Failed to fetch appointments');
        const response = await res.json();
        const data: Appointments[] = response.appointments;
        
        const uniqueCategories = [...new Map(data.map((event) => [event.category.id, event.category])).values(),];

        const colorCodedAppointments = data.map((appt) => ({ ...appt, color: appt.category.color, }));
        const sortedPatients = response.allPatients.sort((a:Patient, b:Patient) =>
        a.firstname.localeCompare(b.firstname)      );

        setPatients(sortedPatients);      
        setCategories(uniqueCategories);

        setEvents(colorCodedAppointments);
        setCurrentEvents(colorCodedAppointments)
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
  }  

  useEffect(() => {
    const today = new Date();
    today.setDate(1); 
    today.setHours(0, 0, 0, 0); 
    const startOfMonth = today.toISOString();

    const end = new Date(today);
    end.setDate(today.getDate() + 60);
    end.setHours(23, 59, 59, 999); 
    const endDate = end.toISOString(); 
    fetchAppointments(startOfMonth,endDate);
  }, []);

  const deleteAppointment = async (id: string) => {
    console.log(id);
    const res = await fetch('/api/appointments/' + id, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.error('Failed to delete appointment');
      return;
    }

    setEvents((events) => events.filter((event) => event.id !== id));
    setCurrentEvents((events) => events.filter((event) => event.id !== id));
  };

  const addAppointment = async (data:FormSchema) => {


    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      start: new Date(data.start).toISOString(),
      end: new Date(data.end).toISOString(),
      location: data.location,
      patient:  data.patient,
      attachements: null,
      category: data.category,
      notes: data.notes,
      title: data.eventTitle
    }), 
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Error:', result.error);
    } else {

      const colorCodedAppointments = result.data.map((appt:Appointments) => ({
        ...appt,
        color: appt.category.color,
      }));

      setEvents((prev) => [...prev, ...colorCodedAppointments]);
      if(currentEvents[0].category.id === colorCodedAppointments[0].category.id) {
        setCurrentEvents((prev) => [...prev, ...colorCodedAppointments]);
      }

    }

   
  };

  const editAppointment = async (data:UpdateSchema) => {

    console.log(data);

    const response = await fetch('/api/appointments', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id:data.id,
      start: new Date(data.start).toISOString(),
      end: new Date(data.end).toISOString(),
      location: data.location,
      patient:  data.patient,
      attachements: null,
      category: data.category,
      notes: data.notes,
      title: data.eventTitle
    }), 
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Error:', result.error);
    } else {

      const updatedEvent = result.data[0];

      setEvents((prev) =>
        prev.map((event) =>
          event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
        )
      );

      const oldEvent = currentEvents.find((obj) => obj.id === result.data[0].id);

      if (oldEvent?.category.id === result.data[0].category.id) {
          setCurrentEvents((prev) =>
          prev.map((event) =>
            event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
          )
        ); 
      } else {
        setCurrentEvents((prev) =>  prev.filter((event) => event.id !== oldEvent!.id));
      }

    }
  };

  return (
    <AppointmentContext.Provider
      value={{ patients,categories,  currentEvents, setCategories, setCurrentEvents, events, setEvents, deleteAppointment, addAppointment,editAppointment, fetchAppointments}}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      'useAppointment must be used within an AppointmentProvider'
    );
  }
  return context;
}
