import React from 'react';

interface ISpritesProps {
    sprites: { [key: string]: string };
    name: string;
}

const PockemonSprites: React.FC<ISpritesProps> = ({ sprites, name }) => {
    const stringUrls = Object.values(sprites).filter((url) => typeof url === 'string');
    return (
        <div className="bg-[#55bde5] rounded-lg mt-3">
            <h1 className="p-[10px] font-bold text-[20px] uppercase">{name}</h1>
            <div className="flex flex-wrap bg-white rounded-lg ml-2 ">
                {stringUrls.map((link, index) => {
                    return (
                        <div key={`${link}-${index}`}>
                            <img src={link} alt="pokemon" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PockemonSprites;
