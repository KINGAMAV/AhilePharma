# Guide de Déploiement et Configuration - AhilePharma

## Vue d'ensemble des améliorations

Ce document détaille les améliorations majeures apportées au projet AhilePharma pour le préparer au déploiement en production.

### Améliorations implémentées

#### 1. Sécurité renforcée

- **Validation des entrées**: Intégration de Joi pour valider tous les paramètres d'entrée (email, mot de passe, rôles).
- **Gestion des secrets JWT**: Amélioration de la gestion du secret JWT avec avertissement en production si le secret par défaut est utilisé.
- **Middleware RBAC**: Implémentation d'un système de contrôle d'accès basé sur les rôles (Role-Based Access Control) pour sécuriser les routes backend.
- **Route Guards Frontend**: Création d'un composant `ProtectedRoute` pour protéger les routes côté client en fonction du rôle de l'utilisateur.

#### 2. Authentification avancée

- **Google OAuth**: Intégration complète de l'authentification Google OAuth 2.0 avec création automatique d'utilisateurs.
- **Service d'authentification refactorisé**: Extraction de la logique métier dans un service dédié pour une meilleure maintenabilité.

#### 3. Gestion des rôles et permissions

- **RBAC Backend**: Middleware pour autoriser/refuser l'accès aux routes en fonction des rôles.
- **RBAC Frontend**: Routes protégées qui redirigent les utilisateurs non autorisés.
- **Dashboard Admin**: Interface complète pour la gestion des utilisateurs, incluant la modification des rôles et la suppression d'utilisateurs.

#### 4. Architecture améliorée

- **Séparation des préoccupations**: Logique métier extraite dans des services (`authService.ts`, `googleAuthService.ts`, `adminService.ts`).
- **Routes API structurées**: Routes organisées par domaine (auth, google, admin).
- **Gestion centralisée des erreurs**: Middleware d'erreur unifié pour une meilleure gestion des exceptions.

## Configuration requise

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Backend Configuration
API_PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ahilepharma

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=30d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/google/callback

# Gemini AI Configuration
GEMINI_API_KEY=your-gemini-api-key

# Frontend Configuration
VITE_API_URL=http://localhost:5000/api
APP_URL=http://localhost:3000
```

### Obtenir les clés Google OAuth

1. Accédez à [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet
3. Activez l'API Google+ et l'API Google Identity
4. Créez des identifiants OAuth 2.0 (type: Application web)
5. Configurez les URI de redirection autorisés avec votre URL de callback
6. Copiez l'ID client et le secret client dans votre `.env.local`

## Installation et démarrage

### Installation des dépendances

```bash
npm install --legacy-peer-deps
```

### Démarrage en développement

**Terminal 1 - Backend:**
```bash
npm run serve:api
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

L'application sera accessible à `http://localhost:3000`

### Build pour la production

```bash
npm run build
```

## Structure des routes API

### Authentification (`/api/auth`)

- `POST /login` - Connexion utilisateur
- `POST /register` - Inscription utilisateur
- `GET /me` - Récupérer les informations de l'utilisateur authentifié
- `POST /logout` - Déconnexion utilisateur

### Google OAuth (`/api/google`)

- `GET /auth` - Initier l'authentification Google
- `GET /callback` - Callback après authentification Google

### Admin (`/api/admin`)

- `GET /users` - Récupérer la liste des utilisateurs (Admin uniquement)
- `GET /stats` - Récupérer les statistiques des utilisateurs (Admin uniquement)
- `DELETE /users/:id` - Supprimer un utilisateur (Admin uniquement)
- `PATCH /users/:id/role` - Modifier le rôle d'un utilisateur (Admin uniquement)

## Rôles et permissions

### Rôles disponibles

- **Patient**: Utilisateur final accédant aux services de santé
- **Doctor**: Médecin offrant des consultations
- **Pharmacy**: Pharmacie gérant les médicaments
- **Clinic**: Clinique offrant des services médicaux
- **Delivery**: Service de livraison

### Accès Admin

Les rôles `Doctor`, `Pharmacy`, `Clinic` et `Delivery` ont accès au dashboard admin pour gérer les utilisateurs et consulter les statistiques.

## Fonctionnalités clés

### Dashboard Admin

Le dashboard admin (`/admin`) permet aux administrateurs de:
- Consulter les statistiques globales (nombre total d'utilisateurs par rôle)
- Voir la liste complète des utilisateurs
- Modifier les rôles des utilisateurs
- Supprimer des utilisateurs

### Authentification Google

Les utilisateurs peuvent se connecter via Google en cliquant sur le bouton Google sur la page de connexion. Un nouvel utilisateur sera automatiquement créé avec le rôle `Patient` si l'email n'existe pas.

### Protection des routes

Les routes du frontend sont protégées par le composant `ProtectedRoute` qui vérifie:
- Si l'utilisateur est authentifié
- Si l'utilisateur a les rôles requis pour accéder à la route

## Recommandations pour la production

### Sécurité

1. **Changez le JWT_SECRET**: Utilisez une clé secrète forte et unique en production
2. **Activez HTTPS**: Assurez-vous que toutes les communications sont en HTTPS
3. **Configurez CORS correctement**: Limitez les origines autorisées à votre domaine
4. **Utilisez un gestionnaire de secrets**: Stockez les clés API dans un gestionnaire de secrets (AWS Secrets Manager, Google Secret Manager, etc.)

### Performance

1. **Activez le cache**: Configurez le cache HTTP pour les ressources statiques
2. **Compressez les réponses**: Activez la compression gzip/brotli
3. **Optimisez les images**: Compressez les images avant de les envoyer à Gemini

### Monitoring

1. **Configurez les logs**: Utilisez un service de logging centralisé (ELK, Datadog, etc.)
2. **Configurez les alertes**: Alertez-vous en cas d'erreurs ou de performance dégradée
3. **Monitoring des performances**: Utilisez des outils comme New Relic ou Datadog

## Troubleshooting

### Erreur: "JWT_SECRET par défaut utilisé en production"

**Solution**: Définissez la variable d'environnement `JWT_SECRET` avec une clé secrète forte.

### Erreur: "Google OAuth non configuré"

**Solution**: Assurez-vous que `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET` sont définis dans votre `.env.local`.

### Erreur: "MongoDB connection failed"

**Solution**: Vérifiez que MongoDB est en cours d'exécution et que `MONGO_URI` est correct.

## Prochaines étapes

1. Implémenter la réinitialisation de mot de passe
2. Ajouter la persistance de l'historique des conversations Gemini
3. Implémenter une liste noire de tokens pour une meilleure gestion des sessions
4. Ajouter des tests unitaires et d'intégration
5. Configurer le CI/CD avec GitHub Actions
6. Mettre en place l'internationalisation (i18n)

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.
