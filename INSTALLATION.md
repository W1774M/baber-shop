# Guide d'Installation - Salon de Coiffure

## Étapes d'installation complètes

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de l'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-aleatoire-ici
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Important** : Pour générer un secret sécurisé, utilisez :
```bash
openssl rand -base64 32
```

### 3. Initialisation de la base de données

```bash
# Créer les tables dans la base de données
npm run db:push

# Créer un compte coiffeur par défaut
npm run init:db
```

Le compte par défaut créé sera :
- **Email** : `admin@salon.com`
- **Mot de passe** : `admin123`

⚠️ **Important** : Changez ce mot de passe après la première connexion !

### 4. Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## Accès à l'espace professionnel

1. Allez sur [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Connectez-vous avec les identifiants par défaut
3. Vous serez redirigé vers le tableau de bord

## Structure des dossiers importants

- `public/uploads/` - Dossier pour les images uploadées (créé automatiquement)
- `database.sqlite` - Base de données SQLite (créée après `npm run db:push`)

## Commandes utiles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Build pour la production
- `npm run start` - Lancer le serveur de production
- `npm run db:push` - Synchroniser le schéma avec la base de données
- `npm run db:studio` - Ouvrir Drizzle Studio (interface graphique pour la DB)
- `npm run init:db` - Créer le compte coiffeur par défaut

## Dépannage

### Erreur : "Cannot find module"
- Supprimez `node_modules` et `package-lock.json`
- Relancez `npm install`

### Erreur : "Database not found"
- Exécutez `npm run db:push` pour créer la base de données

### Erreur : "NextAuth secret missing"
- Vérifiez que le fichier `.env.local` existe et contient `NEXTAUTH_SECRET`

### Les images ne s'affichent pas
- Vérifiez que le dossier `public/uploads/` existe
- Vérifiez les permissions du dossier
