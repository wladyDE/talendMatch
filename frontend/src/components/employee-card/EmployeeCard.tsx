import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import {
    FaEnvelope,
    FaBuilding,
    FaBriefcase,
    FaPhone,
} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import { IUser } from '../../features/currentUser/currentUserSlice';
import ProfilePhoto from '../profile-photo/ProfilePhoto';

interface EmployeeCardProps {
    user: IUser;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ user: currentUser }) => {
    const { displayName, jobTitle, email, mobilePhone, photo, groups } = currentUser;

    const theme = useSelector(selectTheme)
    const styles = currentStyles(theme)

    return (
        <Card className="mb-3" style={styles.card}>
            <Card.Body>
                <Row>
                    <Col md={4} className="text-center">
                        <ProfilePhoto theme={theme} photo={photo} />
                    </Col>
                    <Col md={8}>
                        <Card.Title className='mb-3' style={{ fontWeight: 'bold' }}>{displayName}</Card.Title>
                        <Card.Text className="mb-2"><FaEnvelope /> Email: {email}</Card.Text>
                        <Card.Text className="mb-2"><FaBriefcase /> Position: {jobTitle}</Card.Text>
                        <Card.Text className="mb-2">
                            <FaBuilding /> Abteilung: {groups && groups.length > 0 ? groups[0].displayName : 'Nicht angegeben'}
                        </Card.Text>
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
