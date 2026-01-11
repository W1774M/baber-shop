import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { appointments } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const appointmentSchema = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional(),
  appointmentDate: z.string(),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const data = {
      clientName: body.get('clientName') as string,
      clientEmail: body.get('clientEmail') as string,
      clientPhone: body.get('clientPhone') as string,
      appointmentDate: body.get('appointmentDate') as string,
      notes: body.get('notes') as string,
    };

    const validated = appointmentSchema.parse(data);
    
    // Pour l'instant, on utilise le barber ID 1 par défaut
    // Dans une vraie app, on pourrait avoir plusieurs barbers
    const barberId = 1;

    const appointmentDate = new Date(validated.appointmentDate);

    const newAppointment = await db.insert(appointments).values({
      barberId,
      clientName: validated.clientName,
      clientEmail: validated.clientEmail,
      clientPhone: validated.clientPhone || null,
      appointmentDate: appointmentDate.getTime() / 1000,
      notes: validated.notes || null,
      status: 'pending',
    }).returning();

    return NextResponse.redirect(new URL('/?success=true', request.url));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating appointment:', error);
    return NextResponse.redirect(new URL('/?error=true', request.url));
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const barberId = searchParams.get('barberId');

    if (!barberId) {
      return NextResponse.json({ error: 'barberId is required' }, { status: 400 });
    }

    const allAppointments = await db
      .select()
      .from(appointments)
      .where(eq(appointments.barberId, parseInt(barberId)));

    return NextResponse.json(allAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}
