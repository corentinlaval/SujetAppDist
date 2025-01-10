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
#  Backend (Spring Boot + MongoDB)

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

#  Guide de démarrage du Frontend

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

