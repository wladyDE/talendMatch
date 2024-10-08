import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import {
    FaCalendarAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaBuilding,
    FaBriefcase
} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';

export interface IEmployee {
    name: string;
    year: number;
    email: string;
    location: string;
    department: string;
    position: string;
    image: string;
}

const EmployeeCard: React.FC<IEmployee> = ({ name, year, email, location, department, position, image }) => {
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme)
    
    return (
        <Card className="mb-3" style={styles.card}>
            <Card.Body>
                <Row>
                    <Col md={4} className="text-center">
                        <Image src={image} style={{ borderRadius: '20px' }} fluid /></Col>
                    <Col md={8}>
                        <Card.Title className='mb-3' style={{ fontWeight: 'bold' }}>{name}</Card.Title>
                        <Card.Text className="mb-2"><FaCalendarAlt /> Geburtsjahr: {year}</Card.Text>
                        <Card.Text className="mb-2"><FaEnvelope /> Email: {email}</Card.Text>
                        <Card.Text className="mb-2"><FaMapMarkerAlt /> Standort: {location}</Card.Text>
                        <Card.Text className="mb-2"><FaBuilding /> Abteilung: {department}</Card.Text>
                        <Card.Text className="mb-2"><FaBriefcase /> Position: {position}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default EmployeeCard;
