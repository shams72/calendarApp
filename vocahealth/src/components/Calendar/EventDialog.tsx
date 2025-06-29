'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { ManageAppointments } from '../AppointmentControllerComponents/ManageAppointments';
import { ViewAppointment } from '../AppointmentControllerComponents/ViewAppointments';
import { AppointmentData } from '@/types/appointments';

interface AddEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clickedDate: string | undefined;
}


export function EventDialog({ open, onOpenChange, clickedDate }: AddEventDialogProps) {
  
  const [appointmentView, setAppointmentView] = useState<boolean >(false);
  const [editView, setEditView] = useState<boolean >(false);
  const [appointment, setAppointment] = useState<AppointmentData | null>({
    id:"",
    patient: "",
    location:"",
    eventTitle: "",
    start: "",
    end: "",
    category: "",
    notes: "",
  });

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange} >
       <DialogContent className="overflow-y-scroll h-[35rem] scrollbar-hide">
        {!appointmentView && <ViewAppointment setAppointmentView={setAppointmentView} clickedDate={clickedDate} setEditView={setEditView} setAppointment={setAppointment}/>}
        {appointmentView && <ManageAppointments setAppointmentView={setAppointmentView}  clickedDate={clickedDate} editView={editView} setAppointment={setAppointment} appointment={appointment} setEditView={setEditView} />}
     </DialogContent>
       
    </Dialog>


    </>
  );
}
