import React from 'react'
import { Card } from 'react-bootstrap'
import {
    FaCalendarAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaBuilding,
    FaBriefcase
} from 'react-icons/fa'

const ProfileCard = () => {
    return (
        <Card text='white' className="shadow-lg" style={{ background: 'linear-gradient(135deg, #1c1c1c, #343a40)', borderRadius: '20px' }}>
            <Card.Body>
                <Card.Title className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Volodymyr Havryliuk</Card.Title>
                <Card.Text className="mb-2"><FaCalendarAlt /> Geburtstag: 14.12.1997</Card.Text>
                <Card.Text className="mb-2"><FaEnvelope /> Email: vovawestland@gmail.com</Card.Text>
                <Card.Text className="mb-2"><FaMapMarkerAlt /> Standort: Dortmund</Card.Text>
                <Card.Text className="mb-2"><FaBuilding /> Abteilung: D&A</Card.Text>
                <Card.Text className="mb-2"><FaBriefcase /> Position: Teamleiter</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProfileCard