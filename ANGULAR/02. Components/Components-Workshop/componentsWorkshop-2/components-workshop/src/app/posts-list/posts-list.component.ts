import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../types/post';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  isLoading = true;
  posts: Post[] = [];
  constructor(private api: ApiService){}

 
  ngOnInit(): void {
    this.api.getPosts(5).subscribe((postsData)=>{
      console.log(postsData)
      this.posts = postsData;
      this.isLoading = false;
    })
  }
  

}
