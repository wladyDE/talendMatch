import React from 'react';
import { Image } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

import { centeredFlexBox } from '../../styles/styles';
import './profilePhoto.css';
interface ProfilBildProps {
    theme: 'dark' | 'light';
    photo: string | null;
}

const ProfilePhoto: React.FC<ProfilBildProps> = ({ theme, photo }) => {
    if (photo) {
        return <Image src={photo} style={{ borderRadius: '20px' }} fluid />;
    }

    const userIconColor = theme === 'dark' ? '#B6C2CF' : '#383838';

    return (
        <div className="profile-photo-container" style={centeredFlexBox('center')}>
            <FaUser className="profile-photo-icon" color={userIconColor} />
        </div>
    );
};

export default ProfilePhoto;
