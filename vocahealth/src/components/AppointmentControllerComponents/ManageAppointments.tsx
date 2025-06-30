'use client';

import React from 'react';
import {  DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarFilter } from '../Calendar/CalendarFilter';
import { PatientFilter } from '../Calendar/PateintFilter';
import { useAppointment } from '../Contexts/AppointmentContext';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { AppointmentData } from '@/types/appointments';

interface ManageAppointmentProps {
  appointment: AppointmentData | null;
  editView: boolean;
  clickedDate?:string;
  setEditView: (open: boolean) => void;
  setAppointmentView: (open: boolean) => void;
  setAppointment:(data: AppointmentData | null)=>void;
}

const formSchema = z
  .object({
    patient: z.string().min(1, "Patientenname ist erforderlich"),
    eventTitle: z.string().min(1, "Titel des Termins ist erforderlich"),
    category: z.string().min(1, "Kategorie ist erforderlich"),
    location: z.string().min(1, "Ort ist erforderlich"),
    start: z.date({
      required_error: "Startdatum ist erforderlich",
    }),
    end: z.date({
      required_error: "Enddatum ist erforderlich",
    }),
    notes: z.string().optional(),
  })
  .refine((data) => data.end > data.start, {
    message: "Enddatum muss nach dem Startdatum liegen",
    path: ["end"], // this targets the error message to the "end" field
  });


type FormValues = z.infer<typeof formSchema>;

export function ManageAppointments({setAppointmentView, setAppointment, appointment, editView, setEditView, clickedDate}: ManageAppointmentProps) {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient: appointment?.patient ?? "",
      eventTitle: appointment?.eventTitle ?? "",
      category: appointment?.category ?? "",
      location: appointment?.location ?? "",
      start: appointment?.start ? new Date(appointment.start) : new Date(clickedDate!),
      end: appointment?.end ? new Date(appointment.end) : undefined,
      notes: appointment?.notes ?? "",
    }
  });
  
  const {addAppointment, editAppointment}=useAppointment()

  

  const onSubmit = async(data: FormValues) => {
    setAppointmentView(false);
    setEditView(false);

    if(!editView) {
       addAppointment(data)
    }else {
      editAppointment({...data,id: appointment!.id})
    }
    
  };


  return (
    <>
      <DialogHeader>
        <DialogTitle>{editView ? "Edit Event" : "Add Event"}</DialogTitle>
      </DialogHeader>

      <div className="grid gap-3 mt-2 px-6 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <FormField
              control={form.control}
              name="patient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Patient</FormLabel>
                  <FormControl>
                    <PatientFilter
                      value={field.value}
                      onChange={field.onChange}
                     
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
            <FormField
              control={form.control}
              name="eventTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Titel</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Titel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategorie</FormLabel>
                  <FormControl>
                    <CalendarFilter
                      value={field.value}
                      onChange={field.onChange}
                      editView={editView}
                      formView={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ort</FormLabel>
                  <FormControl>
                    <Input placeholder="Ort" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           <FormField
              control={form.control}
              name="start"
              render={({ field }) => {
                const selectedDate = field.value;
                const now = new Date();

                const midnight = new Date(now);
                midnight.setHours(0, 0, 0, 0);

                return (
                  <FormItem>
                    <FormLabel>Start Datum</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        minDate={now}
                        openToDate={selectedDate}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => {
              const startDate = form.watch("start");

              return (
                <FormItem>
                    <FormLabel>End Datum</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        minDate={startDate}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
   

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notizen</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Notizen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <div className="flex gap-4">

                <Button className="bg-red-600" onClick={() => { setAppointmentView(false); setAppointment(null);}}>
                  {"Cancel"}
                </Button>
                <Button type="submit">
                  {editView ? "Update" : "Create"}
                </Button>
                
              </div>

            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
