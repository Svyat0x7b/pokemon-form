import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Modal from './components/Modal';
import PockemonSprites from './components/PockemonSprites';
import { IFormInput } from './components/Form';

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
        console.log('onFetchPockemonsDetails');
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

    console.log(fetchedPockemons);
    return (
        <div>
            <Form
                onSetTeam={setTeam}
                onOpenModal={setIsModalOpen}
                onFetchPockemonsDetails={fetchPokemonsDetails}
            />
            {isModalOpen && (
                <Modal handleClose={() => setIsModalOpen(false)}>
                    <div>
                        <span>{team.firstName}</span>
                        <span>{team.lastName}</span>
                        <div>
                            {fetchedPockemons.map((pockemon) => (
                                <PockemonSprites sprites={pockemon.sprites} name={pockemon.name} />
                            ))}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default App;
