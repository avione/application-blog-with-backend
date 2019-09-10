# Application-blog-with-backend

# Utilisation d'Angular 8, Material Design for Bootstrap 

* Cette petite application montre l'utilisation des différents types de databinding et le passage de propriétés paramètres et variables d'un component à un autre.

* Dans cet exemple : 
- J'ai utilisé les directives structurelles *ngFor, ngStyle et ngClass dans les fichiers template html des components  PostListComponent,  PostListItemComponent. 

- Dans le component AppComponent j'ai créé un tableau de post que j'ai passé en paramètre dans le template html de  la manière suivante:
<app-post-list [posts]="posts"></app-post-list>
- Que j'ai récupéré ensuite dans le component PostListComponent avec la ligne de commande suivante:
@Input()  posts: Post[];

- J'ai passé ensuite tous les posts du tableau du component PostListComponent par le template html au component PostListItemComponent  en utilisant la directive *ngFor de la manière suivante:
<app-post-list-item  *ngFor="let post of posts" 
  [post]="post"
  ></app-post-list-item> 
- Que j'ai récupéré dans PostListItemComponent avec la ligne de commande suivante:
 @Input()  post: Post; 
 (La class modèle Post contient les éléments title, content, create_at, loveits)   
 
- J'ai créé les fonctions   getColor() pour l'associer aux directives [ngStyle], onloveIts() et onDontLoveIts() pour les associer au événement (click), ainsi que le pipe pour le format de l'affichage de la date.


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
- Une fois que c'est terminé éxecuter la commande : 
#		ng serve
- Ouvrez votre browser avec l'url:
#		http://localhost:4200
