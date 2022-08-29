import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../App';

const ProtectedRoute = ({ children, ...rest }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log('children:', children);
    // console.log('rest:', rest);

    return (
        <div>
            {
                loggedInUser.email
                    ? children
                    : <Navigate to='/login' />
            }

        </div>
    );
};

export default ProtectedRoute;