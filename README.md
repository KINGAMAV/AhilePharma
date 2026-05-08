# AhilePharma - Plateforme de Santé Numérique

<div align="center">
<img width="1200" height="475" alt="AhilePharma Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 🏥 À propos du projet

AhilePharma est une plateforme de santé numérique innovante qui connecte patients, médecins, pharmacies et cliniques. Alimentée par l'IA Gemini de Google, elle offre des fonctionnalités avancées comme l'analyse d'ordonnances et l'assistance médicale intelligente.

### 🎯 Objectif

Créer un écosystème de santé numérique sécurisé, accessible et facile à utiliser, où les différents acteurs du secteur médical peuvent collaborer efficacement.

## ✨ Fonctionnalités principales

### Pour les patients
- 📋 Consultation avec des médecins
- 💊 Accès à une pharmacie en ligne
- 📸 Analyse d'ordonnances par IA
- 🚚 Suivi des livraisons
- 💬 Chat médical avec assistance IA

### Pour les professionnels
- 👨‍⚕️ Profil de médecin avec calendrier de consultations
- 🏥 Gestion de clinique
- 💉 Gestion de pharmacie
- 📊 Dashboard d'administration
- 👥 Gestion des utilisateurs

### Sécurité et conformité
- 🔐 Authentification sécurisée avec JWT
- 🔑 Authentification Google OAuth
- 🛡️ Contrôle d'accès basé sur les rôles (RBAC)
- ✅ Validation stricte des données
- 📝 Gestion centralisée des erreurs

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- MongoDB 4.4+
- Compte Google Cloud (pour OAuth)
- Clé API Gemini

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/KINGAMAV/AhilePharma.git
cd AhilePharma

# Installer les dépendances
npm install --legacy-peer-deps

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés API
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

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Guide complet de déploiement et configuration
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Résumé des améliorations v1.1.0
- **[CHANGELOG.md](./CHANGELOG.md)** - Historique des modifications
- **[rapport_modifications.md](./rapport_modifications.md)** - Analyse initiale et recommandations

## 🏗️ Architecture

### Frontend
- **React 19** - Framework UI moderne
- **TypeScript** - Typage statique
- **TailwindCSS** - Styling utility-first
- **Zustand** - Gestion d'état légère
- **React Router** - Routage côté client

### Backend
- **Node.js + Express** - Framework serveur
- **TypeScript** - Typage statique
- **MongoDB + Mongoose** - Base de données
- **Passport.js** - Authentification OAuth
- **Joi** - Validation des données

### IA
- **Google Gemini** - Analyse d'ordonnances et assistance médicale

## 🔐 Sécurité

### Authentification
- JWT avec expiration configurable
- Google OAuth 2.0
- Hachage des mots de passe avec bcryptjs

### Autorisation
- RBAC (Role-Based Access Control)
- Route Guards frontend
- Middleware RBAC backend

### Validation
- Validation stricte des entrées avec Joi
- Sanitization des données utilisateur
- Gestion centralisée des erreurs

## 👥 Rôles et permissions

| Rôle | Accès | Permissions |
|------|-------|------------|
| Patient | Pages patient | Consultation, pharmacie, suivi |
| Doctor | Dashboard admin | Gestion utilisateurs, statistiques |
| Pharmacy | Dashboard admin | Gestion utilisateurs, statistiques |
| Clinic | Dashboard admin | Gestion utilisateurs, statistiques |
| Delivery | Dashboard admin | Gestion utilisateurs, statistiques |

## 📊 Structure du projet

```
AhilePharma/
├── server/
│   ├── middleware/          # Middlewares (RBAC, etc.)
│   ├── models/              # Modèles Mongoose
│   ├── routes/              # Routes API
│   ├── services/            # Logique métier
│   ├── utils/               # Utilitaires
│   └── index.ts             # Point d'entrée serveur
├── src/
│   ├── components/          # Composants React
│   ├── contexts/            # Contextes React
│   ├── hooks/               # Hooks personnalisés
│   ├── pages/               # Pages
│   ├── services/            # Services API
│   ├── stores/              # Stores Zustand
│   ├── utils/               # Utilitaires
│   └── App.tsx              # Composant principal
├── DEPLOYMENT_GUIDE.md      # Guide de déploiement
├── IMPLEMENTATION_SUMMARY.md # Résumé des améliorations
├── CHANGELOG.md             # Historique des modifications
└── package.json             # Dépendances
```

## 🔌 Routes API

### Authentification (`/api/auth`)
- `POST /login` - Connexion
- `POST /register` - Inscription
- `GET /me` - Profil utilisateur
- `POST /logout` - Déconnexion

### Google OAuth (`/api/google`)
- `GET /auth` - Initier l'authentification
- `GET /callback` - Callback après authentification

### Administration (`/api/admin`)
- `GET /users` - Liste des utilisateurs
- `GET /stats` - Statistiques
- `DELETE /users/:id` - Supprimer un utilisateur
- `PATCH /users/:id/role` - Modifier le rôle

## 🧪 Tests

```bash
# Vérifier les types TypeScript
npm run type-check

# Linter
npm run lint

# Formater le code
npm run format
```

## 🚢 Déploiement

### Préparation
1. Configurez toutes les variables d'environnement
2. Changez le JWT_SECRET
3. Activez HTTPS
4. Configurez CORS correctement

### Déploiement
```bash
npm run build
npm start  # ou déployer avec votre plateforme
```

Voir [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) pour les détails complets.

## 📈 Prochaines fonctionnalités

- [ ] Réinitialisation de mot de passe
- [ ] Persistance de l'historique Gemini
- [ ] Tests automatisés
- [ ] CI/CD avec GitHub Actions
- [ ] Internationalisation (i18n)
- [ ] Notifications en temps réel
- [ ] Audit logging

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez:

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact

Pour toute question ou suggestion:
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de développement

## 🙏 Remerciements

- Google pour l'API Gemini
- La communauté React et Node.js
- Tous les contributeurs

---

**Version**: 1.1.0  
**Dernière mise à jour**: 2026-05-08  
**Statut**: Prêt pour le déploiement
