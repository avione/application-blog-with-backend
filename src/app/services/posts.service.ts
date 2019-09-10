import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  getLastPost() {
    throw new Error("Method not implemented.");
  }

  post: Post;
  posts: Post[] = [];

  postsSubject = new Subject<Post[]>();

  constructor() { }

  initPosts() {
    //Initialisation du tableau avec les 3 premiers post
    this.posts = new Array<Post>();
    this.post = new Post(0, 'Mon premier post', 'Administrator',
      'créez un type pour les post, appelé Post, afin de rendre votre code plus lisible.  Vous pouvez même y intégrer un constructeur qui attribue automatiquement la date !', 1);
    this.posts.push(this.post);
    this.post = new Post(1, 'Mon deuxième post', 'Administrator',
      'créez un type pour les post, appelé Post, afin de rendre votre code plus lisible.  Vous pouvez même y intégrer un constructeur qui attribue automatiquement la date !', -1);
    this.posts.push(this.post);
    this.post = new Post(2, 'Encore un post', 'Administrator',
      'créez un type pour les post, appelé Post, afin de rendre votre code plus lisible.  Vous pouvez même y intégrer un constructeur qui attribue automatiquement la date !', 0);
    this.posts.push(this.post);
    //on sauvegarde le tableau des posts
    this.savePosts();
  }
  emitPosts() {
    //Emission du tableau posts pour réactualiser le contenu du tableau posts
    this.postsSubject.next(this.posts);
  }
  getLastPostId() {
    return this.posts.length;
  }
  savePosts() {
    firebase.database().ref('/posts/').set(this.posts);
  }
  getPosts() {
    //permet de récuperer le tableau des posts à partir de la base firebase
    firebase.database().ref('/posts')
      .on('value', (data) => {
        this.posts = data.val() ? data.val() : [];
        //si le tableau des post est vide on l'initialise avec les 3 premiers posts et on le sauvegarde
        if (this.posts.length == 0) this.initPosts();
        //on emet ensuite le tableau des posts
        this.emitPosts();
      });
  }
  getSinglePost(id: number) {
    //permet d'obtenir par la méthode promise un seul post grace à son id
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id)
          .once('value').then((data) => {
            resolve(data.val());
          },
            (error) => {
              reject(error);
            }
          );
      }
    );
  }
  createNewPost(newpost: Post) {
    //Ajout du post dans le tableau posts
    this.posts.push(newpost);
    // sauvegarde du tableau posts
    this.savePosts();
    //Emission du tableau posts pour réactualiser le contenu du tableau posts
    this.emitPosts();
  }
  savePost(post: Post) {
    // récuperation de index du post
    post.id = this.getIdPost(post);
    //Mise à jour du tableau posts avec le post
    this.posts[post.id] = post;
    // sauvegarde du tableau posts
    this.savePosts();
    //Emission du tableau posts pour réactualiser le contenu du tableau posts
    this.emitPosts();
  }
  removePost(post: Post) {
    //retirer l'image si elle existe avant suppression du post
    if (post.photo) {
      const storageRef = firebase.storage().refFromURL(post.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    //Supprimer le post du tableau posts on va d'abord récupéré son id.
    post.id = this.getIdPost(post);
    this.posts.splice(post.id, 1);
    // sauvegarde du tableau posts
    this.savePosts();
    //Emission du tableau posts pour réactualiser le contenu du tableau posts
    this.emitPosts();
  }
  getIdPost(post: Post) {
    //premet de trouver l'id du post
    const idPost = this.posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    return idPost;
  }

  uploadFile(file: File) {
    // permet de uploder le fichier en renvoyant l'url du nom du fichier par le promise
    // qui sera en suite socker dans la attribut photo du post
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
