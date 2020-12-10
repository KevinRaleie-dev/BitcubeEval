import React from 'react'
import Loading from './components/Loading';
import Routes from './Routes'
import { setAccessToken } from './token';

export const App = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('http://localhost:4000/refresh_token', { method: 'POST', credentials: 'include'})
            .then(async (data) => {
                const {accessToken} = await data.json();
                setAccessToken(accessToken);
                setLoading(false);
            });
    }, []);

    if(loading) {
        return <Loading />
    }
    return (
        <Routes />
    )
}
