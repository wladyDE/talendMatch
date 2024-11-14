import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import {
    FaEnvelope,
    FaBuilding,
    FaBriefcase,
    FaPhone,
    FaMapMarkerAlt,
    FaHome
} from 'react-icons/fa'
import { useSelector } from 'react-redux';

import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import { IEmployee } from '../../features/currentUser/currentUserSlice';
import ProfilePhoto from '../profile-photo/ProfilePhoto';

interface EmployeeCardProps {
    user: IEmployee;
    style?: React.CSSProperties;
    onClick?: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ user, style, onClick }) => {
    const { displayName, jobTitle, department, officeLocation, streetAddress, city, postalCode, mail, mobilePhone, photo } = user;

    const theme = useSelector(selectTheme)
    const styles = currentStyles(theme)

    return (
        <Card
            className="mb-3"
            style={{ ...styles.card, ...style }}
            onClick={onClick ? () => onClick(user.employeeId) : undefined}
        >
            <Card.Body>
                <Row>
                    <Col md={4} className="text-center">
                        <ProfilePhoto theme={theme} photo={photo} />
                    </Col>
                    <Col md={8}>
                        <Card.Title className='mb-3' style={{ fontWeight: 'bold' }}>{displayName}</Card.Title>
                        <CardText
                            description='Email :'
                            text={mail}
                            icon={<FaEnvelope />}
                        />
                        <CardText
                            description='Bürolage :'
                            text={officeLocation}
                            icon={<FaMapMarkerAlt />}
                        />
                        <CardText
                            description='Abteilung :'
                            text={department}
                            icon={<FaBuilding />}
                        />
                        <CardText
                            description='Position :'
                            text={jobTitle}
                            icon={<FaBriefcase />}
                        />
                        <CardText
                            description='Wohnanschrift :'
                            text={getAddress(streetAddress, city, postalCode)}
                            icon={<FaHome />}
                        />
                        <CardText
                            description='Telefon :'
                            text={mobilePhone}
                            icon={<FaPhone />}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card >
    );
};

export default EmployeeCard;

interface CardTextProps {
    description: string,
    text: string | null,
    icon: JSX.Element,
}

type Text = string | null;

const isValidText = (text: Text): boolean => !!text && text !== "null";

const CardText: React.FC<CardTextProps> = ({ text, icon, description }) => {
    if (!isValidText(text)) return null;

    return <Card.Text className='mb-2'>{icon} {description} {text}</Card.Text>
}

const getAddress = (streetAddress: Text, city: Text, postalCode: Text): string | null => {
    if (!isValidText(streetAddress) || !isValidText(city) || !isValidText(postalCode)) {
        return null;
    }
    return `${streetAddress}, ${postalCode} ${city}`;
}

