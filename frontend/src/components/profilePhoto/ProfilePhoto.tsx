import React from 'react';
import { Image } from 'react-bootstrap';

import { FaUser } from 'react-icons/fa'

interface ProfilBildProps {
    theme: 'dark' | 'light';
    photo: string | null
}

const ProfilePhoto: React.FC<ProfilBildProps> = ({ theme, photo }) => {
    if (photo) {
        return <Image src={photo} style={{ borderRadius: '20px' }} fluid />
    }

    const userIconColor = theme === 'dark' ? '#B6C2CF' : '#383838';

    return <FaUser size={200} color={userIconColor} />
};

export default ProfilePhoto;