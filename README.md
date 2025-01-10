# 🏅 Sports Manager - Votre outil de gestion sportive tout-en-un

Bienvenue dans **Sports Manager** ! 🏆  
Ce projet a été conçu avec passion pour répondre aux besoins des amateurs de sport, des coachs et des managers. Que vous souhaitiez gérer vos équipes, suivre les performances de vos joueurs ou organiser vos matchs, **Sports Manager** est là pour simplifier votre quotidien.

## 🔧 Technologies utilisées

- **Angular** (Front)
- **Node.js / Express** (API REST)
- **MongoDB** (Base de données)
- **Docker** (Conteneurisation)

## 📋 Fonctionnalités principales

- Ajout, modification et suppression d'équipes et de joueurs ⚽️
- Suivi des performances individuelles et collectives 📊
- Gestion des matchs et des résultats en temps réel 🕒
- Gestion des points et des classements des équipes 🏆

---

> **Note** : Ce projet a été développé dans le cadre d'une formation en ingénierie avec une approche full-stack moderne, axée sur la gestion des données sportives.

---

# 📚 Table des matières

1. [Backend](#Backend)
2. [Frontend](#Frontend)
3. [Description de l'application](#Description de l'application)

---

# Backend (Spring Boot + MongoDB)

Bienvenue dans le backend du projet **Sports Manager** !  
Ce backend est développé avec **Spring Boot** et utilise **MongoDB** comme base de données NoSQL.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- **Java 17** ou une version plus récente
- **Maven** (ou utilisez directement les commandes Maven Wrapper incluses dans le projet)
- **MongoDB** (local ou hébergé)
- **Docker** (optionnel, pour une exécution conteneurisée)

---

## 📂 Structure du projet

```
/Back/exam
├── src
│   └── main
│   │   ├── java
│   │   │   └── com.poc.exam
│   │   │       └── ...
│   │   └── resources
│   │       └── application.properties
│   └── test
└──  pom.xml
```

---

## 🚀 Lancer le backend

Suivez ces étapes pour lancer le backend localement :

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/corentinlaval/SujetAppDist.git
cd SujetAppDist/Back/exam
```

### 2️⃣ Configurer MongoDB

Assurez-vous que votre instance **MongoDB** est en cours d'exécution.  
Par défaut, le projet est configuré pour se connecter à un MongoDB local :

- **URL de connexion** : `mongodb://localhost:27017`
- **Nom de la base de données** : `sportsmanager`

```docker
docker pull mongo:latest
docker run -d --name mongodb -p 27017:27017 mongo:latest
docker ps
```

Vous pouvez modifier les paramètres de connexion dans le fichier `application.properties` :

```properties
# application.properties
spring.data.mongodb.uri=mongodb://localhost:27017
spring.data.mongodb.database=sportsmanager
```

---

### 3️⃣ Construire le projet

Utilisez **Maven** pour construire le projet :

```bash
mvn clean install
```

---

### 4️⃣ Démarrer le serveur

Une fois le projet construit, démarrez le backend avec la commande :

```bash
mvn spring-boot:run
```

Le backend sera disponible sur [http://localhost:8080](http://localhost:8080).

---

## 🛠️ Tests

Pour exécuter les tests unitaires :

```bash
mvn test
```

---

#  Frontend (Angular)

## 📁 Structure du projet

```bash
/Front/exam
├── src
│   ├── app
│   │    └── ...
│   ├── index.html
│   ├── main.ts
│   └── style.css
├── angular.json
├── package.json
├── tsconfig.json
└── ...
```

## 🚀 Étape 1 : Pré-requis

Avant de démarrer, assurez-vous d’avoir les outils suivants installés :

- **Node.js** (version 16+ recommandée)
- **Angular CLI**

### 🔍 Vérifiez les versions installées avec les commandes suivantes :

```bash
node -v
ng version
```

Si les versions ne correspondent pas aux pré-requis, vous pouvez télécharger et installer les dernières versions depuis les liens suivants :

•	[Télécharger Node.js](https://nodejs.org/)

•	[Documentation Angular CLI](https://angular.io/cli)

## 📦 Étape 2 : Installation des dépendances

Rendez-vous dans le dossier `/Front/exam` et exécutez la commande suivante pour installer les dépendances du projet :

```bash
cd Front/exam
npm install
```
Cette commande permettra de télécharger et d’installer automatiquement toutes les bibliothèques nécessaires au bon fonctionnement du projet, en se basant sur le fichier package.json.

## ▶️ Étape 3 : Lancer l’application Angular en mode développement

Pour démarrer l'application Angular en mode développement, rendez-vous dans le dossier `/Front` et exécutez la commande suivante :

```bash
ng serve
```

L’application sera disponible à l’adresse suivante par défaut :
[http://localhost:4200/](http://localhost:4200/)

➡️ Note : Si le port 4200 est déjà utilisé, Angular attribuera automatiquement un autre port. Cette information sera affichée dans la console.

Si vous souhaitez utiliser un port différent :

```bash
ng serve --port 4300
```

## 🧪 Étape 5 : Lancer les tests unitaires

Pour exécuter les tests unitaires de l'application Angular, utilisez la commande suivante dans le dossier `/Front/exam` :

```bash
ng test
```

# Description de l'application

## 🎯 Objectif du projet

L'application **Sports Manager** a pour but de fournir une solution complète de gestion d'équipes sportives. Elle permet aux utilisateurs de consulter, créer, modifier et supprimer des équipes, des joueurs et des matchs. Cette application est divisée en deux parties principales :

- **Back-end** : Développé avec **Spring Boot** et utilisant **MongoDB** pour le stockage des données.
- **Front-end** : Développé avec **Angular**, offrant une interface utilisateur fluide et intuitive.

Le projet s'inspire des systèmes de gestion utilisés dans les clubs sportifs pour centraliser les informations et optimiser la gestion des équipes et des événements sportifs.

---

## 🌟 Fonctionnalités principales

- 📋 **Gestion des équipes** :
    - Ajouter de nouvelles équipes
    - Modifier les informations des équipes existantes
    - Supprimer des équipes
    - Voir les détails des équipes

- 🏃‍♂️ **Gestion des joueurs** :
    - Ajouter des joueurs aux équipes
    - Mettre à jour les informations des joueurs
    - Supprimer des joueurs
    - Voir les détails des joueurs

- 🏆 **Gestion des matchs** :
    - Planifier des matchs
    - Mettre à jour les scores des matchs
    - Supprimer des matchs
    - Voir les récapitulatifs des matchs

---

## ⚙️ Technologies utilisées

| Technologie    | Description                              |
|----------------|------------------------------------------|
| **Spring Boot** | Framework back-end en Java               |
| **MongoDB**     | Base de données NoSQL                   |
| **Angular**     | Framework front-end pour l'interface utilisateur |
| **Docker**      | Conteneurisation des services            |

---

## 🖼️ Architecture du projet

L'application est composée de deux dossiers principaux :
- Le dossier `/Back` contient le code du serveur back-end (API REST).
- Le dossier `/Front` contient le code de l'application front-end Angular.

## 📚 Cas d'utilisation

**Exemple : Gestion d'une équipe de football**

1. 🔧 **Créer une nouvelle équipe** : Le manager peut ajouter une équipe de football avec son nom, son logo et sa ville d'origine.


2. 👥 **Ajouter des joueurs** : Le manager peut ensuite ajouter des joueurs à l'équipe, avec leurs noms, numéros et positions.


3. 📅 **Planifier un match** : Le manager peut planifier un match, ajouter les scores et suivre les performances de l'équipe.


4.  **Consulter les news** : Le manager peut consulter de vrais news de la BBC.


5.  **Consulter les classements** : Le manager peut consulter les divers classements des joueurs et équipes.

---
## 🔄 Évolutions futures

Ce projet est un **point de départ** solide, mais il y a encore de nombreuses améliorations et évolutions que j'aimerais y apporter afin de le rendre **plus complet, sécurisé et professionnel**. Voici quelques pistes d'améliorations que j'envisage pour les futures versions de l'application :

### 🔐 1. Sécurisation de l'API
La sécurisation de l'API est une priorité. Voici les pistes que j'aimerais explorer :
- **Implémentation d'un système d'authentification et d'autorisation** via un mécanisme basé sur JWT (JSON Web Token).
- **Gestion des rôles utilisateurs** (administrateurs, managers, etc.), permettant de limiter les accès à certaines fonctionnalités selon les privilèges de chaque utilisateur.
- **Mise en place de protections contre les attaques courantes** : injections SQL, Cross-Site Scripting (XSS), etc.
- **Cryptage des données sensibles** stockées dans la base de données, comme les mots de passe utilisateurs.

### 📦 2. Script d’initialisation de la base de données
L'une des améliorations majeures serait la création d'un **script d'insertion automatique de données** pour la base MongoDB. L'objectif est de fournir un ensemble de données par défaut afin de pouvoir tester l'application dès son installation.

Le script pourrait :
- **Créer des utilisateurs de test** avec différents rôles.
- **Générer automatiquement des équipes, des joueurs, des matchs, etc.** pour avoir un exemple concret dès le démarrage.
- **Prévoir des données réalistes** pour rendre l'expérience plus immersive.

----

## 🙏 Remerciements

Merci beaucoup pour le temps que vous avez pris pour lire ce document et découvrir mon projet. J'ai investi beaucoup de temps pour concevoir une application complète.

Ce projet représente pour moi un véritable **travail personnel de A à Z**, où j'ai pu mettre en pratique les connaissances acquises durant mes études, mais aussi explorer de nouvelles technologies et relever des défis techniques.

J'ai pris **énormément de plaisir** à le réaliser et à voir le projet prendre forme, étape par étape. Mon objectif était de créer quelque chose de concret, professionnel, et qui puisse, je l'espère, **vous plaire autant qu'il m'a plu à réaliser**.

Je tiens à préciser que le **README n’est peut-être pas aussi détaillé** ou bien présenté que je l'aurais souhaité, par manque de temps. J’aurais aimé m’y consacrer davantage pour vous offrir une documentation plus aboutie, mais j'ai préféré me concentrer sur la réalisation de l'application elle-même. **J’espère toutefois que vous trouverez ce guide suffisamment clair pour prendre en main le projet.**

Merci encore pour votre attention et votre intérêt ! 😊
