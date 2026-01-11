import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { availabilities } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const availabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/),
  isActive: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const barberId = parseInt(session.user.id);
    const allAvailabilities = await db
      .select()
      .from(availabilities)
      .where(eq(availabilities.barberId, barberId));

    return NextResponse.json(allAvailabilities);
  } catch (error) {
    console.error('Error fetching availabilities:', error);
    return NextResponse.json({ error: 'Échec de la récupération' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const validated = availabilitySchema.parse(body);
    const barberId = parseInt(session.user.id);

    const newAvailability = await db.insert(availabilities).values({
      barberId,
      dayOfWeek: validated.dayOfWeek,
      startTime: validated.startTime,
      endTime: validated.endTime,
      isActive: validated.isActive ?? true,
    }).returning();

    return NextResponse.json(
      { message: 'Disponibilité ajoutée avec succès', availability: newAvailability[0] },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating availability:', error);
    return NextResponse.json({ error: 'Échec de la création' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const availabilityId = searchParams.get('id');

    if (!availabilityId) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    await db.delete(availabilities).where(eq(availabilities.id, parseInt(availabilityId)));

    return NextResponse.json({ message: 'Disponibilité supprimée avec succès' });
  } catch (error) {
    console.error('Error deleting availability:', error);
    return NextResponse.json({ error: 'Échec de la suppression' }, { status: 500 });
  }
}
