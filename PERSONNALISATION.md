# Guide de Personnalisation

Ce guide vous explique comment personnaliser facilement votre salon de coiffure pour le présenter à vos clients.

## Configuration rapide

Tous les éléments personnalisables se trouvent dans le fichier `lib/config.ts`. Ouvrez ce fichier et modifiez les valeurs selon vos besoins.

### Nom et identité du salon

```typescript
export const salonConfig = {
  name: 'Salon de Coiffure',  // ← Changez le nom ici
  tagline: 'Votre destination pour toutes vos coupes...',  // ← Votre slogan
  slogan: 'Convivialité, Professionnalisme, Passion',  // ← Votre devise
  // ...
}
```

### Coordonnées

```typescript
address: 'Adresse du salon',  // ← Votre adresse complète
phone: '01 23 45 67 89',      // ← Votre numéro de téléphone
email: 'contact@salon.com',   // ← Votre email
```

### Horaires d'ouverture

```typescript
hours: {
  weekdays: 'Lundi - Vendredi: 9h - 19h',
  saturday: 'Samedi: 9h - 18h',
  sunday: 'Dimanche: Fermé',
},
```

### Description du salon

Modifiez la section `description` pour personnaliser le texte de présentation :

```typescript
description: {
  title: 'Bienvenue dans notre salon',
  paragraphs: [
    'Premier paragraphe...',
    'Deuxième paragraphe...',
    // Ajoutez ou supprimez des paragraphes selon vos besoins
  ],
},
```

## Personnalisation des services

Les services proposés se trouvent dans `app/page.tsx`, dans la section "Pricing Section". Modifiez le tableau des services :

```typescript
{[
  { name: 'Coupe Homme', price: '20€' },
  { name: 'Coupe Femme', price: '30€' },
  // Ajoutez ou modifiez vos services ici
].map((service, idx) => (
  // ...
))}
```

## Personnalisation de l'équipe

La section "Notre Équipe" se trouve également dans `app/page.tsx`. Modifiez les membres de l'équipe :

```typescript
{[
  { name: 'Stéphane', services: 'Coupe Homme, Dégradé, Barbe' },
  { name: 'Marie', services: 'Coupe Femme, Coloration, Brushing' },
  // Ajoutez vos coiffeurs ici
].map((stylist, idx) => (
  // ...
))}
```

## Personnalisation des produits

La section produits se trouve dans `app/page.tsx`. Modifiez les produits proposés :

```typescript
<div className="bg-dark-light rounded-2xl p-8 ...">
  <h3 className="...">Soins capillaires</h3>
  <p className="...">Description du produit</p>
  // Modifiez ici
</div>
```

## Personnalisation des couleurs

Les couleurs sont définies dans `tailwind.config.ts` et `app/globals.css`. Les principales couleurs utilisées sont :

- **beige** : Couleur principale (boutons, accents)
- **dark** : Couleur de fond principale
- **dark-light** : Couleur de fond secondaire

Pour changer les couleurs, modifiez les valeurs dans `tailwind.config.ts`.

## Après modification

Après avoir modifié `lib/config.ts` ou les autres fichiers :

1. Redémarrez le serveur de développement si nécessaire
2. Les changements seront visibles immédiatement

## Exemple complet

Voici un exemple de configuration pour un salon spécifique :

```typescript
export const salonConfig = {
  name: 'Coiffure Élégance',
  tagline: 'L'art de la coiffure pour hommes et femmes',
  slogan: 'Élégance, Créativité, Excellence',
  address: '123 Rue de la Mode, 75001 Paris',
  phone: '01 42 36 78 90',
  email: 'contact@coiffure-elegance.fr',
  hours: {
    weekdays: 'Mardi - Vendredi: 10h - 19h',
    saturday: 'Samedi: 9h - 18h',
    sunday: 'Dimanche: Fermé',
  },
  description: {
    title: 'Bienvenue chez Coiffure Élégance',
    paragraphs: [
      'Notre salon vous accueille dans un cadre raffiné au cœur de Paris.',
      'Notre équipe de stylistes expérimentés vous propose des coupes sur mesure.',
      // ...
    ],
  },
};
```

## Support

Pour toute question ou personnalisation avancée, consultez la documentation de Next.js et Tailwind CSS.
