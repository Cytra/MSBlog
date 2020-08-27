import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { AuthUtilsService } from '@modules/auth/services';
import { Post } from '@modules/blog/models';
import { BlogService } from '@modules/blog/services';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'sb-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    postsObservable!: Observable<any[]>;
    postsSimple!: Post[];
    subscription: Subscription = new Subscription();
    isLoggedIn = false;


    constructor(
        private blogService: BlogService,
        private authUtilsService: AuthUtilsService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}
    ngOnInit() {
        this.postsObservable = this.blogService.getPosts$()
        // this.blogService.getPosts$()
        // .subscribe(posts => console.log(posts))

        //     )
        //     // posts.map(a => {

        //     // })
        //     // this.postsSimple = posts.map(item => {
        //     //     console.log(item)
        //     //     return {
        //     //         id: item.id,
        //     //         heading : item.heading,
        //     //         subHeading : item.subHeading,
        //     //         slug : item.slug,
        //     //         backgroundImage : item.backgroundImage,
        //     //         meta : item.meta,
        //     //         body : item.body
        //     //     } as Post
        //     // })
        //     console.log(this.postsSimple)
        // })

        
        // .subscribe((posts: Post[]) => {
        //     this.posts = posts as Post[]
        //     console.log(posts)
        // })

        // this.subscription.add(
        //     this.authUtilsService.isLoggedIn$().subscribe(isLoggedIn => {
        //         this.isLoggedIn = isLoggedIn;
        //         this.changeDetectorRef.detectChanges();
        //     })
        // );
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
