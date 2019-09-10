import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Post } from '../model/post';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;


  constructor(private formBuilder: FormBuilder, private postsService: PostsService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    //initialisation du formulaire avec les champs obligatoires
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSavePost() {
    //Sauvegarde du post, on récupère les valeurs du formulaire
    const id = this.postsService.getLastPostId();
    const title = this.postForm.get('title').value;
    const author = this.postForm.get('author').value;
    const content = this.postForm.get('content').value;
    const newPost = new Post(id, title, author, content, 0);

    //On vérifie si une image a été uploader
    if(this.fileUrl && this.fileUrl !== '') {
      newPost.photo = this.fileUrl;
    }
    //On sauvegarde le post et on l'ajoute à la liste des posts
    this.postsService.createNewPost(newPost);
    //On route l'utilisateur sur la liste des posts
    this.router.navigate(['/posts']);
  }

  detectFiles(event) {
    //Détection de l'évenement pour le upload du fichier
    this.onUploadFile(event.target.files[0]);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.postsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
}

