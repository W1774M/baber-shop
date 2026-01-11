import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { photos } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    const photoUrl = `/uploads/${filename}`;
    const barberId = parseInt(session.user.id);

    const newPhoto = await db.insert(photos).values({
      barberId,
      url: photoUrl,
      title: title || null,
      description: description || null,
    }).returning();

    return NextResponse.json(
      { message: 'Photo ajoutée avec succès', photo: newPhoto[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json({ error: 'Échec de l\'upload de la photo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get('id');

    if (!photoId) {
      return NextResponse.json({ error: 'ID de photo requis' }, { status: 400 });
    }

    await db.delete(photos).where(eq(photos.id, parseInt(photoId)));

    return NextResponse.json({ message: 'Photo supprimée avec succès' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json({ error: 'Échec de la suppression' }, { status: 500 });
  }
}
