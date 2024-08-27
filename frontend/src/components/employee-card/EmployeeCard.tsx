import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';

interface EmployeeCardProps {
    name: string;
    year: number;
    email: string;
    location: string;
    department: string;
    position: string;
    image: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ name, year, email, location, department, position, image }) => {    
    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col md={4} className="text-center">
                    <Image src={image} style={{ borderRadius: '20px' }} fluid /></Col>
                    <Col md={8}>
                        <h5>{name}</h5>
                        <p><strong>Geburtsjahr:</strong> {year}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Standort:</strong> {location}</p>
                        <p><strong>Abteilung:</strong> {department}</p>
                        <p><strong>Position:</strong> {position}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default EmployeeCard;
