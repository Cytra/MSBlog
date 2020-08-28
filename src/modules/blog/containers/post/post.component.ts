import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthUtilsService } from '@modules/auth/services';
import { Post } from '@modules/blog/models';
import { BlogService } from '@modules/blog/services';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'sb-post',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './post.component.html',
    styleUrls: ['post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
    //@Input() PostId! : string ;
    //static id = 'PostComponent';
    id: string | null = null;
    subscription: Subscription = new Subscription();
    isLoggedIn = false;
    post$!: Observable<Post | undefined>;
    post!: string;

    pst: Observable<Post> = of({
        heading : "header",
        subHeading: "sub",
        backgroundImage : "https://source.unsplash.com/WLUHO9A_xik/1600x900",
        body : "body"
    })

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private blogService: BlogService,
        private authUtilsService: AuthUtilsService,
        public afAuth: AngularFireAuth
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('post');
        if(this.id !== null ){
            this.post$ = this.blogService.getPost$(this.id);
            //this.blogService.getPost$(this.id).subscribe(post => console.log(post))
        } 
        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    editPost() {
        this.router.navigateByUrl(`/edit/${this.id}`);
    }
}
