import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { photos } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const allPhotos = await db
      .select()
      .from(photos)
      .orderBy(desc(photos.createdAt));

    return NextResponse.json(allPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}
