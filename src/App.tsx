import { useState, useEffect } from 'react';
import Form from './components/Form';
import Modal from './components/Modal';
import { IFormInput } from './components/Form';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team, setTeam] = useState<IFormInput>({
        firstName: '',
        lastName: '',
        pockemons: [],
    });

    // useEffect(() => {}, [team, setTeam]);

    return (
        <div>
            <Form onSetTeam={setTeam} onOpenModal={setIsModalOpen} />
            {isModalOpen && (
                <Modal handleClose={() => setIsModalOpen(false)}>
                    <div>
                        <span>{team.firstName}</span>
                        <span>{team.lastName}</span>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default App;
