# 🦸‍♂️ SuperHero Manager

**SuperHero Manager** est une application web Fullstack permettant de gérer une base de données de super-héros. Ce projet a été réalisé dans le cadre du module "Technologie du Web". Il met en œuvre une architecture **MERN** (MongoDB, Express, React, Node.js) avec un typage strict en **TypeScript**.

## 🚀 Fonctionnalités

### 👤 Utilisateurs & Sécurité
- **Inscription & Connexion** sécurisée (JWT + Bcrypt).
- **Gestion des Rôles (RBAC) :**
  - `Visiteur` : Lecture seule (Dashboard et Détails).
  - `Utilisateur` : Ajout et modification de ses héros.
  - `Admin` : Pleins pouvoirs (Suppression de héros + Panel d'administration).
- **Protection des routes** via middleware (Frontend et Backend).

### ⚡ Gestion des Héros (CRUD)
- **Visualisation :** Tableau de bord (Dashboard) avec cartes interactives.
- **Détails :** Fiche complète avec statistiques, pouvoirs et grande image.
- **Ajout/Modification :** Formulaires dynamiques avec **upload d'images** (Multer).
- **Recherche Avancée :**
  - Barre de recherche (Nom ou Alias).
  - Filtres par Univers (Marvel, DC Comics, Autre...).
  - Tri (Ordre alphabétique ou Date d'ajout).

### 🛠 Administration
- **Panel Admin** réservé aux administrateurs.
- Visualisation de la liste des utilisateurs inscrits.
- Affichage des rôles et dates d'inscription.

---

## 🛠 Technologies Utilisées

### Frontend
- **React** (Vite)
- **TypeScript**
- **TailwindCSS** (Design responsive)
- **Axios** (Requêtes HTTP)
- **React Router** (Navigation SPA)

### Backend
- **Node.js** & **Express**
- **TypeScript**
- **MongoDB** & **Mongoose** (Base de données NoSQL)
- **Multer** (Gestion des uploads d'images)
- **JWT** (Authentification JSON Web Token)

---

## ⚙️ Installation et Lancement

Suivez ces étapes pour lancer le projet localement sur votre machine.

### Prérequis
* Node.js (v16 ou supérieur)
* MongoDB (Installé localement ou via MongoDB Atlas)

### 1. Cloner le projet
```bash
git clone [https://github.com/Maximenavellier/Projet_Final_SuperHeroManager.git](https://github.com/Maximenavellier/Projet_Final_SuperHeroManager.git)
cd superhero-manager
```
###2. Configuration du Backend
Installez les dépendances du serveur :

```bash

cd backend
npm install
Créez un fichier nommé .env à la racine du dossier backend et ajoutez-y la configuration suivante :
```
Extrait de code
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/superheroes
JWT_SECRET=mon_super_secret_securise
```
Lancez le serveur :
```Bash

npm run dev
Le serveur démarrera sur http://localhost:5000 et créera le dossier uploads automatiquement.
```
### 3. Configuration du Frontend
Ouvrez un nouveau terminal et installez les dépendances du client :

```Bash

cd frontend
npm install
```
Lancez l'application React :

```Bash

npm run dev
L'application sera accessible sur http://localhost:5173
```

### 📂 Structure du projet
superhero-manager/
├── backend/
│   ├── src/
│   │   ├── controllers/  # Logique métier
│   │   ├── models/       # Schémas Mongoose (User, Hero)
│   │   ├── routes/       # Définition des endpoints API
│   │   └── middleware/   # Auth, Upload, Rôles
│   └── uploads/          # Stockage des images uploadées
└── frontend/
    ├── src/
    │   ├── api/          # Configuration Axios
    │   ├── components/   # Navbar, Cards, ProtectedRoute
    │   ├── context/      # Gestion globale de l'Auth
    │   └── pages/        # Dashboard, Login, Admin, Details
### 📝 Auteur
Projet réalisé par Navellier Maxime
