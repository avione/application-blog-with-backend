# Application-blog-with-backend
* Application-blog angular 8 with backend Firebase
# Utilisation d'Angular 8, Material Design for Bootstrap et Firebase

* Cette petite application montre l'utilisation des différents types de databinding et le passage de propriétés paramètres et variables d'un component à un autre.

* Dans cet exemple : 
- J'ai utilisé les directives structurelles *ngFor, ngStyle et ngClass dans les fichiers template html des components  PostListComponent,  PostListItemComponent. 
- Création d'un service qui stocke l'array des posts et  les publies sous forme de Subject — le service permet également l'ajout d'un nouveau post et la suppression d'un post existant.
- intégrration d'un bouton "Supprimer" sur chaque PostListItemComponent.
- Création d'un nouveau component, NewPostComponent, qui comporte un formulaire (méthode réactive) qui permet à l'utilisateur d'entrer le titre, l'auteur et le contenu d'un nouveau post, ainsi que l'ajout d'une image. Ce nouveau post sera ensuite créé et ajouté par le service PostService à l'array posts et enregistrer dans la base firebase, et l'utilisateur sera redirigé vers la liste des posts.
- Intégration d'un menu de navigation en haut (avec le routing correspondant par le biais de Material Design), permet de naviguer vers la liste des posts (/posts) et vers le formulaire (/new) (le path vide sera redirigé vers le path /posts) — le lien du menu correspondant à la route active comportera la classe active.
- Chaque click sur sur les boutons loveIts et DontloveIts augmente ou diminue le nombre de loveIts et est enregistré dans la base FireBase par le service PostService.


# Utilisation de LOCALE_ID: 
Pour l'utilisation des dates en angular 8 et pour le format des dates
Il faut ajouter les import suivant dans app.module.ts:
- import { LOCALE_ID } from '@angular/core';
- import { registerLocaleData } from '@angular/common';
- import localeFr from '@angular/common/locales/fr';
- registerLocaleData(localeFr, 'fr-FR');
- il faut ensuite indiquer sur la ligne providers:
- providers: [{provide: LOCALE_ID, useValue: 'fr-FR' }]

# Dans la class model Post:
this.create_at = new Date();
# Pipe pour l'affichage et le format d'une date:
{{ post.create_at | date: 'dd/MM/yyyy HH:mm:ss' : 'fr-FR' }}

# Installation pour windows:

* Pour installer cette application, vous devez avoir installer au préalable nodejs:

- Exécuter une invite de commande cmd.exe et installer angular/cli en exécutant la commande:
#		npm install -g @angular/cli

- Downloader le zip et dezipper le dans un répertoire nommé test ou utiliser la commande: 
#		git clone https://github.com/avione/application-blog.git 
- Dans une invite de commande cmd.exe 

- Positionnez-vous ensuite dans le répertoire test et exécuter la commande : 
#		npm install

# Pour firebase :
- Créer un fichier credentiels.ts dans le répertoire app.
- Vous devez aller en suite sur le site http://firebase.google.com 
- Vous vous connectez avec votre compte google et accéder en suite à la console.
- Créer un nouveau projet, récupérer les clés de config firebase et l'ajouter dans le fichier credentiels.ts dans le répertoire app.

Voici un exemple fictif de clés du contenu du fichier credentiels.ts:
- export var firebaseConfig = {
-    apiKey: "AIzaYyBlAsLPyKJ0z2ckhy2Vxtt_D9ThpHN5FWE",
-    authDomain: "app-blog-3a974.firebaseapp.com",
-    databaseURL: "https://app-blog-3a974.firebaseio.com",
-    projectId: "app-blog-3a974",
-    storageBucket: "app-blog-3a974.appspot.com",
-    messagingSenderId: "21310261064",
-    appId: "1:21310261064:web:76e97c8b65d50748"
- }

- Une fois que c'est terminé éxecuter la commande : 
#		ng serve
- Ouvrez votre browser avec l'url:
#		http://localhost:4200
