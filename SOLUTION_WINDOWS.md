# Solution pour Windows - Problème better-sqlite3

## Problème
`better-sqlite3` nécessite Visual Studio Build Tools pour compiler les modules natifs sur Windows, ce qui peut être problématique.

## Solution appliquée
J'ai remplacé `better-sqlite3` par `@libsql/client` qui :
- ✅ Ne nécessite **pas de compilation native**
- ✅ Fonctionne sur Windows sans outils supplémentaires
- ✅ Est compatible avec Drizzle ORM
- ✅ Utilise SQLite en mode local (fichier)

## Installation

1. **Supprimez les anciens modules** (si installation précédente a échoué) :
```bash
rm -rf node_modules
rm pnpm-lock.yaml  # ou package-lock.json si vous utilisez npm
```

2. **Réinstallez les dépendances** :
```bash
pnpm install
# ou
npm install
```

3. **Initialisez la base de données** :
```bash
pnpm run db:push
pnpm run init:db
```

## Alternative : Installer Visual Studio Build Tools

Si vous préférez utiliser `better-sqlite3` (plus performant), vous pouvez installer Visual Studio Build Tools :

1. Téléchargez [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)
2. Installez avec le workload **"Desktop development with C++"**
3. Redémarrez votre terminal
4. Réinstallez les dépendances

Puis remplacez dans `package.json` :
- `"@libsql/client": "^0.14.0"` → `"better-sqlite3": "^11.0.0"`
- Et mettez à jour `lib/db/index.ts` pour utiliser `better-sqlite3`

## Notes

- `@libsql/client` est légèrement moins performant que `better-sqlite3` mais suffisant pour la plupart des cas d'usage
- La base de données reste un fichier SQLite local (`database.sqlite`)
- Toutes les fonctionnalités restent identiques
