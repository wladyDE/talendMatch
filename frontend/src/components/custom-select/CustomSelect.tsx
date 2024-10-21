import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import './customSelect.css';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    placeholder: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(options[0]);
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme);
    const selectRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={selectRef}
            className="custom-select"
            style={styles.card}
        >
            <div className="select-box" onClick={toggleDropdown}>
                {selectedOption ? selectedOption.label : placeholder}
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <ul className="options-list">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`option-item ${selectedOption?.value === option.value ? 'selected' : ''}`}
                            style={{
                                ...styles.card, 
                                backgroundColor: theme === 'dark' ? '#22272B' : 'white'
                            }}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
