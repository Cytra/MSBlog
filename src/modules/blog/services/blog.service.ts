import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '@common/services';
import { Post } from '@modules/blog/models';
import {
    CreatePostPayload,
    ResultsPost,
    UpdatePostPayload,
} from '@start-bootstrap/sb-clean-blog-shared-types';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class BlogService {
    constructor(
        private http: HttpClient,
        private configService: ConfigService,
        private router: Router,
        private afAuth: AngularFireAuth, 
        private db: AngularFirestore
    ) {}

    getPosts$() {
        return this.db
        .collection<Post>('posts')
        .valueChanges({ idField: 'id'})
        // return this.http
        //     .get<ResultsPost[]>(`${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts`)
        //     .pipe(
        //         map(posts =>
        //             (posts as Post[]).map(post => {
        //                 return post;
        //             })
        //         )
        //     );
    }

    getPost$(id: string) {
        return this.db.collection<Post>('posts').doc<Post>(id).valueChanges()
        // const params = new HttpParams().set('findBy', 'slug');
        // return this.http
        //     .get<ResultsPost>(
        //         `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts/${postSlug}`,
        //         {
        //             params,
        //         }
        //     )
        //     .pipe(map(post => post as Post));
    }

    async createPost$(payload: Post) {
        console.log(payload);
        const user = await this.afAuth.currentUser;
        return this.db.collection('posts').add({
            payload
        });
    }

    updatePost$(post: Post, payload: UpdatePostPayload): Observable<undefined | Error> {
        return this.http
            .put<undefined>(
                `${this.configService.config.sbCleanBlogNodeURL}/api/latest/posts/${post.id}`,
                payload
            )
            .pipe(tap(response => this.router.navigate([`/${post.slug}`])));
    }

    deletePost$(id: string) {
        return this.db
        .collection('posts')
        .doc(id)
        .delete();
    }
}
