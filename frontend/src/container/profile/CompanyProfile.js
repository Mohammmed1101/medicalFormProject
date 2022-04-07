import React from 'react';
import Profile from './Profile';
import NewPost from '../posts/NewPost';
function CompanyProfile(props) {
    return (
        <div>
            <Profile/>
            <NewPost/>
        </div>
    );
}

export default CompanyProfile;