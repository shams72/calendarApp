import { supabase } from '@/lib/SupabaseClient'
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(  req: NextRequest,  context: { params: Promise<{ id: string }>  }
) {
    const { id } = await context.params;


  await supabase.from('activities').delete().eq('appointment', id);
  await supabase.from('appointment_assignee').delete().eq('appointment', id);
  
  const { error } = await supabase.from("appointments").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Appointment deleted successfully" });
}
