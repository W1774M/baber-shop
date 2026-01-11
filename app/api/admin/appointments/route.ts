import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { appointments } from '@/lib/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const barberId = parseInt(session.user.id);
    const allAppointments = await db
      .select()
      .from(appointments)
      .where(eq(appointments.barberId, barberId))
      .orderBy(asc(appointments.appointmentDate));

    return NextResponse.json(allAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Échec de la récupération des rendez-vous' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID et statut requis' }, { status: 400 });
    }

    const barberId = parseInt(session.user.id);

    // Vérifier que le rendez-vous appartient au barber
    const appointment = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, id))
      .limit(1);

    if (appointment.length === 0 || appointment[0].barberId !== barberId) {
      return NextResponse.json({ error: 'Rendez-vous non trouvé' }, { status: 404 });
    }

    await db
      .update(appointments)
      .set({ status })
      .where(eq(appointments.id, id));

    return NextResponse.json({ message: 'Statut mis à jour avec succès' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Échec de la mise à jour' }, { status: 500 });
  }
}
