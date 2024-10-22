import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser} from '../../features/currentUser/currentUserSlice'
import { selectTheme } from '../../features/theme/themeSlice'
import { styles as currentStyles } from '../../styles/styles'
import './skillsCheckBox.css'
import { useToggleSkillsVisibilityMutation } from '../../app/services/currentUser'

const SkillsCheckBox = () => {
    const currentUser = useSelector(selectCurrentUser)
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme)
    const [toggleSkillsVisibilityRequest] = useToggleSkillsVisibilityMutation()

    const title = currentUser.skillsVisibility
        ? 'Profil für andere Mitarbeiter verbergen'
        : 'Profil für andere Mitarbeiter anzeigen'

        const handleClick = async () => {
            try {
                await toggleSkillsVisibilityRequest({
                    employeeId: currentUser.employeeId,
                    skillsVisibility: !currentUser.skillsVisibility,  
                }).unwrap();
            } catch (error) {
                console.error("Failed to change skillsVisibility:", error);
            }
        }
        

    return (
        <div
            style={{ ...styles.card }}
            className='skills-visibility-checkbox'
            title={title}
            onClick={handleClick}
        >
            {currentUser.skillsVisibility && <span>&#10003;</span>}
        </div>
    )
}

export default SkillsCheckBox