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
        <Card className="shadow-lg card">
            <Card.Body>
                <Card.Title className="mb-3 card-title">Volodymyr Havryliuk</Card.Title>
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