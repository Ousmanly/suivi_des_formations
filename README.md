# Suivi Formation

Ce projet est une application de suivi des formations des étudiants. Il permet de gérer les étudiants, les modules, les inscriptions, et les piements.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clonez le dépôt :

````bash
git clone https://github.com/OusmaneLy/suivi_formation.git

2.Accédez au répertoire du projet :

```bash
cd suivi_formation
````

3.Installez les dépendances :

```bash
npm install
```

## Configuration de la Base de Données

1.Assurez-vous que PostgreSQL est en cours d'exécution et créez une base de données pour le projet.

2.Configurez Prisma en créant un fichier `.env` à la racine du projet et en ajoutant la variable `DATABASE_URL` avec l'URL de votre base de données :

```plaintext
DATABASE_URL="postgresql://utilisateur:mot_de_passe@localhost:5432/nom_de_la_base"
```

3.Générez le client Prisma et synchronisez le schéma avec la base de données :

```bash
npx prisma generate
npx prisma migrate dev --name initial_migration
```

## Utilisation

Pour démarrer le serveur backend, exécutez :

```bash
npm start
```

## Auteur

[Assa Baradji](https://github.com/AssaBaradji)

[Ousmane Ly](https://github.com/OusmaneLy)

[Zuber Ba](https://github.com/ZuberBa)
