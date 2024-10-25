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
import { IEmployee } from '../../features/currentUser/currentUserSlice';
import ProfilePhoto from '../profile-photo/ProfilePhoto';

interface EmployeeCardProps {
    user: IEmployee;
    style?: React.CSSProperties;
    onClick?: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ user, style, onClick }) => {
    const { displayName, jobTitle, mail, mobilePhone, photo, groups } = user;

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
                        <Card.Text className="mb-2"><FaEnvelope /> Email: {mail}</Card.Text>
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
