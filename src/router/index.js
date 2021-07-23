import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
        // 打分页面
        {
            path: '/scorePage',
            name: 'scorePage',
            component: () => import( /* webpackChunkName: "score" */ '../views/score/index.vue'),
            meta: {
                title: '评分',
            }
        },
        // 下载excel
        {
            path: '/download',
            name: 'download',
            component: () => import( /* webpackChunkName: "score" */ '../views/score/downloadXls.vue'),
            meta: {
                title: '评分',
            }
        },
        // 项目列表
        {
            path: '/common/projectLinks',
            name: 'projectLinks',
            component: () => import( /* webpackChunkName: "score" */ '../views/common/projectLink.vue'),
            meta: {
                title: '项目罗列',
            }
        },
    ]

const router = new Router({
    mode: 'history',
    base: '/wap/njcscec/',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
        return savedPosition
        } else {
        return { x: 0, y: 0 }
        }
    }
    })

export default router