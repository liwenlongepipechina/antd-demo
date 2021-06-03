import { Redirect } from 'react-router-dom';
import Login from '@/views/Login';
import LayoutContainer from '@/views/Layout';
import Home from '@/views/Home';
import User from '@/views/User';

const routes = [
    {
        path: '/',
        exact: true,
        render: () => {
            return <Redirect to={'/login'}></Redirect>
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        render: (props) => {
            return <LayoutContainer {...props} />
        },
        routes: [
            {
                path: '/',
                exact: true,
                render: () => {
                    return <Redirect to={'/home'}></Redirect>
                }
            },
            {
                path: '/home',
                component: Home
            },
            {
                path: '/user',
                component: User
            }
        ]
    }
];

export default routes;