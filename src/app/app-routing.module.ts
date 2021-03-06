import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {LayoutComponent} from './layout/layout.component';
import {ContactListComponent} from './contact-list/contact-list.component';
import {ContactNewComponent} from './contact-new/contact-new.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagNewComponent } from './tag-new/tag-new.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { AuthGuard } from './auth-guard.service';

// 0. 路由模块初始化
// 1. 配置路由表
//      请求 xxx 路径的时候，导航到 xxx 组件
// 2. 配置路由出口及路由导航链接
const routes: Routes = [
    {
        path: '',
        redirectTo: '/contacts',
        pathMatch: 'full'   // 必须完全匹配到路径的时候才能重定向
    },
    {
        path: 'layout',
        component: LayoutComponent
    },
    {
        // 当我们访问 contacts 的时候，会先把 LayoutComponent 组件渲染出来
        // 然后把 children 中 path 为空的路由渲染到 LayoutComponent 组件中的路由出口
        path: 'contacts',
        component: LayoutComponent,
        canActivate: [AuthGuard],   // 在导航到 contacts 之前会先进入路由守卫
        children: [
            {
                path: '',
                component: ContactListComponent
            },
            {
                path: 'new',
                component: ContactNewComponent
            },
            {
                path: 'edit/:id',
                component: ContactEditComponent
            }
        ]
    },
    {
        path: 'tags',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: TagListComponent
            },
            {
                path: 'new',
                component: TagNewComponent
            },
            {
                path: 'edit',
                component: TagEditComponent
            }
        ]
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})

export class AppRoutingModule {
}
