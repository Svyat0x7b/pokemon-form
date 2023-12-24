import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Modal from './components/Modal';
import PockemonSprites from './components/PockemonSprites';
import { IFormInput } from './components/Form';
import PockemonImg from '../public/images/pockemon.png';

interface IPockemon {
    name: string;
    sprites: { [key: string]: string };
}

function App() {
    const [fetchedPockemons, setFetchedPokemons] = useState<IPockemon[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team, setTeam] = useState<IFormInput>({
        firstName: '',
        lastName: '',
        pockemons: [],
    });

    const fetchPokemonsDetails = async () => {
        setFetchedPokemons([]);
        const { pockemons } = team;
        let pokemonsTemp: IPockemon[] = [];
        for (let pockemon of pockemons) {
            const res = await axios.get(pockemon.url);
            const { data } = res;
            pokemonsTemp.push({
                sprites: { ...data.sprites },
                name: data.forms[0].name,
            });
        }
        setFetchedPokemons(pokemonsTemp);
    };

    useEffect(() => {
        if (team.firstName === '') return;

        fetchPokemonsDetails();
    }, [team, setTeam]);

    return (
        <div>
            <h1 className="text-center text-[28px] font-bold mt-20 flex justify-center gap-3">
                <span className="text-[#9d1919]">Pockemon</span>
                <img src={PockemonImg} alt="pockemon" width={40} />
                Team
            </h1>
            <Form
                onSetTeam={setTeam}
                onOpenModal={setIsModalOpen}
                onFetchPockemonsDetails={fetchPokemonsDetails}
            />
            {isModalOpen && (
                <Modal handleClose={() => setIsModalOpen(false)}>
                    <div>
                        <div className="flex gap-1 justify-center bg-[#dddddd] rounded-xl py-2">
                            <span>{team.firstName}</span>
                            <span>{team.lastName}</span>
                        </div>
                        <div>
                            {fetchedPockemons.map((pockemon, index) => (
                                <PockemonSprites
                                    sprites={pockemon.sprites}
                                    name={pockemon.name}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default App;
