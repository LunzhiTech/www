import Vue from 'vue';
import Router from 'vue-router';
import Container from '../views/Container.vue';
import Index from '../views/Index.vue';
import Parents from '../views/Parents.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        routes: [
            {
                path: '',
                component: Container,
                children: [
                    { path: '', component: Index },
                    { path: 'parents', component: Parents }
                ]
            }
        ]
    });
}
