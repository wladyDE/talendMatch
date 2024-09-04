import React, { useState } from 'react';

interface SkillLevelSelectorProps {
    skill: string;
    levels: string[];
}

const LevelSelect: React.FC<SkillLevelSelectorProps> = ({ skill, levels }) => {
    const [hoveredLevel, setHoveredLevel] = useState<number>(0);

    const handleMouseEnter = (index: number) => {
        setHoveredLevel(index + 1);
    };

    const handleMouseLeave = () => {
        setHoveredLevel(0);
    };

    const getColorForLevel = (index: number) => {
        const colorStart = '#dcf4f9';
        const colorEnd = '#00a3c8'; 
        const ratio = index / (levels.length - 1);
        const mix = (start: number, end: number) => Math.round(start + ratio * (end - start));

        const startRGB = colorStart.match(/\w\w/g)?.map(x => parseInt(x, 16)) || [0, 0, 0];
        const endRGB = colorEnd.match(/\w\w/g)?.map(x => parseInt(x, 16)) || [0, 0, 0];

        const mixedRGB = startRGB.map((start, i) => mix(start, endRGB[i]));

        return `rgb(${mixedRGB.join(',')})`;
    };

    return (
        <div className="d-flex align-items-center">
            {levels.map((level, index) => (
                <div
                    key={index}
                    title={level} 
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        width: '20px',
                        height: '20px',
                        margin: '0 5px',
                        backgroundColor:
                            index + 1 <= (hoveredLevel || 0)
                                ? getColorForLevel(index)
                                : '#e9ecef',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-in-out',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                />
            ))}
        </div>
    );
};

export default LevelSelect;
