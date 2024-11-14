import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import './customSelect.css';

export interface IOption {
    id : string; 
    displayName : string; 
}

interface CustomSelectProps<T extends IOption> {
    options: T[];
    placeholder: string;
    onOptionClick : (group : IOption) => void
    firstOption : T
}

const CustomSelect = <T extends IOption>(
    { options, placeholder, onOptionClick, firstOption }: CustomSelectProps<T>) => { 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<T | null>(firstOption);
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme);
    const selectRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: T) => {
        setSelectedOption(option);
        setIsOpen(false);
        onOptionClick(option)
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
                {selectedOption ? selectedOption.displayName : placeholder}
                <span className="arrow">{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <ul className="options-list">
                    {options.map((option) => (
                        <li
                            key={option.displayName}
                            className={`option-item ${selectedOption?.displayName === option.displayName ? 'selected' : ''}`}
                            style={{
                                ...styles.card, 
                                backgroundColor: theme === 'dark' ? '#22272B' : 'white'
                            }}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.displayName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
