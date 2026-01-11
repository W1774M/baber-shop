# 💇 Salon de Coiffure - Plateforme de Réservation

Une plateforme complète pour les salons de coiffure permettant la réservation en ligne et la gestion de leur activité. Adaptée pour les salons mixtes (hommes et femmes).

## 🚀 Fonctionnalités

### Site Public
- **Page d'accueil** avec présentation du salon
- **Galerie photos** des coupes réalisées
- **Formulaire de réservation** en ligne
- Interface moderne et responsive

### Espace Professionnel (Privé)
- **Authentification sécurisée** pour les coiffeurs
- **Gestion des photos** : ajout et suppression d'images de coupes
- **Gestion des disponibilités** : définir les horaires d'ouverture par jour
- **Gestion des rendez-vous** : voir, confirmer, annuler et marquer comme terminé

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation

1. **Installer les dépendances**
```bash
npm install
```

2. **Initialiser la base de données**
```bash
npm run db:push
```

3. **Créer un compte coiffeur par défaut**
```bash
npx tsx scripts/init-db.ts
```

Un compte par défaut sera créé :
- Email: `admin@salon.com`
- Mot de passe: `admin123`

4. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
salon-coiffure/
├── app/
│   ├── api/              # Routes API
│   │   ├── auth/        # Authentification NextAuth
│   │   ├── admin/       # Routes admin (protégées)
│   │   ├── appointments/ # Réservations publiques
│   │   └── photos/      # Photos publiques
│   ├── admin/           # Pages admin
│   │   ├── login/       # Page de connexion
│   │   └── dashboard/   # Tableau de bord
│   └── page.tsx         # Page d'accueil publique
├── components/
│   └── admin/           # Composants admin
├── lib/
│   ├── db/              # Configuration base de données
│   └── auth.ts          # Configuration NextAuth
└── public/
    └── uploads/         # Images uploadées
```

## 🔐 Authentification

L'espace professionnel est protégé par NextAuth.js. Pour vous connecter :
1. Allez sur `/admin/login`
2. Utilisez les identifiants créés lors de l'initialisation

## 📸 Upload d'Images

Les photos sont stockées dans `public/uploads/`. Assurez-vous que ce dossier existe et a les bonnes permissions.

## 🗄️ Base de Données

Le projet utilise SQLite avec Drizzle ORM. La base de données est stockée dans `database.sqlite`.

### Schémas principaux :
- **barbers** : Comptes des coiffeurs (nom technique de la table, peut être renommé)
- **photos** : Photos de coupes
- **appointments** : Rendez-vous clients
- **availabilities** : Disponibilités par jour

## 🚀 Déploiement

### Variables d'environnement

Créez un fichier `.env.local` :
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-aleatoire-ici
```

Pour générer un secret :
```bash
openssl rand -base64 32
```

### Production

1. Build de l'application :
```bash
npm run build
```

2. Lancer le serveur :
```bash
npm start
```

## 📝 Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run db:push` - Synchroniser le schéma avec la base de données
- `npm run db:studio` - Ouvrir Drizzle Studio (interface DB)

## 🎨 Technologies Utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles
- **Drizzle ORM** - ORM pour SQLite
- **NextAuth.js** - Authentification
- **Zod** - Validation de schémas
- **date-fns** - Manipulation de dates
- **Lucide React** - Icônes

## 📄 Licence

MIT
