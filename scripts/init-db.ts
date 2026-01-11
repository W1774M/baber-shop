import { db } from '../lib/db';
import { barbers } from '../lib/db/schema';
import bcrypt from 'bcryptjs';

async function initDatabase() {
  try {
    console.log('Initialisation de la base de données...');

    // Vérifier si un coiffeur existe déjà
    const existingBarbers = await db.select().from(barbers).limit(1);

    if (existingBarbers.length === 0) {
      // Créer un compte coiffeur par défaut
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await db.insert(barbers).values({
        email: 'admin@salon.com',
        password: hashedPassword,
        name: 'Admin Coiffeur',
        phone: '+33 1 23 45 67 89',
      });

      console.log('✅ Compte coiffeur créé:');
      console.log('   Email: admin@salon.com');
      console.log('   Mot de passe: admin123');
    } else {
      console.log('✅ La base de données est déjà initialisée');
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

initDatabase();
