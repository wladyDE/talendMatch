import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import {
    FaCalendarAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaBuilding,
    FaBriefcase,
    FaPhone
} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import { IUser } from '../../features/currentUser/currentUserSlice';
import userPhotoWhite from '../../img/user.png'
import userPhotoBlack from '../../img/user_black.png'

interface EmployeeCardProps {
    currentUser: IUser;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ currentUser }) => {
    const { displayName, jobTitle, email, mobilePhone, photo, groups } = currentUser; 
    
    const theme = useSelector(selectTheme)
    const styles = currentStyles(theme)

    const userPhoto = photo || theme === 'dark' ? userPhotoBlack : userPhotoWhite
    
    return (
        <Card className="mb-3" style={styles.card}>
            <Card.Body>
                <Row>
                    <Col md={4} className="text-center">
                        <Image src={photo || userPhoto} style={{ borderRadius: '20px' }} fluid /></Col>
                    <Col md={8}>
                        <Card.Title className='mb-3' style={{ fontWeight: 'bold' }}>{displayName}</Card.Title>
                        <Card.Text className="mb-2"><FaEnvelope /> Email: {email}</Card.Text>
                        <Card.Text className="mb-2"><FaBriefcase /> Position: {jobTitle}</Card.Text>
                        <Card.Text className="mb-2"><FaBuilding /> Abteilung: {groups[0]}</Card.Text>
                        <Card.Text className="mb-2"><FaPhone /> Telefon: {mobilePhone}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default EmployeeCard;

//<Card.Text className="mb-2"><FaCalendarAlt /> Geburtsjahr: {year}</Card.Text>
//<Card.Text className="mb-2"><FaMapMarkerAlt /> Standort: {location}</Card.Text>
