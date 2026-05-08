# Changelog - AhilePharma

## [1.1.0] - 2026-05-08

### Ajout

- **Authentification Google OAuth**: Intégration complète de Google OAuth 2.0 pour permettre aux utilisateurs de se connecter via leur compte Google
- **Dashboard Admin**: Interface complète pour la gestion des utilisateurs avec statistiques, modification des rôles et suppression d'utilisateurs
- **RBAC (Role-Based Access Control)**: Système de contrôle d'accès basé sur les rôles pour sécuriser les routes backend et frontend
- **Route Guards Frontend**: Composant `ProtectedRoute` pour protéger les routes côté client en fonction du rôle
- **Service d'authentification refactorisé**: Extraction de la logique métier dans des services dédiés pour une meilleure maintenabilité
- **Validation des entrées**: Intégration de Joi pour valider tous les paramètres d'entrée
- **Middleware RBAC**: Middleware pour autoriser/refuser l'accès aux routes en fonction des rôles
- **Routes API Admin**: Endpoints pour gérer les utilisateurs et consulter les statistiques
- **Service Admin Frontend**: Service pour communiquer avec les endpoints admin
- **Documentation de déploiement**: Guide complet pour le déploiement et la configuration en production

### Modifié

- **Backend**: Refonte complète de la structure avec séparation des préoccupations
- **Gestion des erreurs**: Middleware d'erreur centralisé pour une meilleure gestion des exceptions
- **JWT**: Amélioration de la gestion du secret JWT avec avertissement en production
- **Routes d'authentification**: Utilisation des services pour une meilleure organisation du code

### Sécurité

- Validation stricte des entrées avec Joi
- Middleware RBAC pour protéger les routes sensibles
- Gestion améliorée des secrets JWT
- Route Guards pour protéger les routes frontend

### Dépendances ajoutées

- `joi`: Validation des données
- `passport`: Authentification OAuth
- `passport-google-oauth20`: Stratégie Google OAuth pour Passport

## [1.0.0] - 2026-04-XX

### Version initiale

- Application de santé numérique avec intégration Gemini AI
- Frontend React avec TailwindCSS
- Backend Express avec MongoDB
- Authentification JWT
- Intégration Gemini pour l'analyse d'ordonnances et l'assistance médicale
- Gestion d'état avec Zustand
- Routage avec React Router

## Notes de migration

### De 1.0.0 à 1.1.0

1. Mettez à jour les variables d'environnement avec les nouvelles clés Google OAuth
2. Installez les nouvelles dépendances: `npm install joi passport passport-google-oauth20 @types/passport-google-oauth20 --legacy-peer-deps`
3. Mettez à jour votre `.env.local` avec les variables requises (voir DEPLOYMENT_GUIDE.md)
4. Redémarrez le backend et le frontend
5. Testez l'authentification Google et le dashboard admin

## Prochaines versions

### Planifié pour 1.2.0

- Réinitialisation de mot de passe
- Persistance de l'historique des conversations Gemini
- Liste noire de tokens pour meilleure gestion des sessions
- Tests unitaires et d'intégration
- CI/CD avec GitHub Actions
- Internationalisation (i18n)
