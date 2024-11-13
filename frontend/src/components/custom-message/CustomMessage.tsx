import React from 'react';
import { centeredFlexBox } from '../../styles/styles';

interface CustomMessageProps {
    message: string;
}

const CustomMessage: React.FC<CustomMessageProps> = ({ message }) => {
    return (
        <div style={{
            ...centeredFlexBox('center'),
            height: '100vh',
        }}>
            <h2 style={{ textAlign: 'center', margin: 0 }}>{message}</h2>
        </div>
    );
};

export default CustomMessage;
