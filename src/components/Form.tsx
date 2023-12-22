import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';
import Select, { ActionMeta } from 'react-select';

interface IFormInput {
    firstName: string;
    lastName: string;
    pockemons: IOption[];
}
interface IOption {
    name: string;
    url: string;
}

const defaultValues = {
    firstName: '',
    lastName: '',
    pockemons: [],
};

const Form = () => {
    const [fetchedOptions, setFetchedOptions] = useState<IOption[]>([]);
    const { register, handleSubmit, control, reset } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
        reset(defaultValues);
    };

    useEffect(() => {
        const fetchPockemons = async () => {
            const pockemons = await axios.get('https://pokeapi.co/api/v2/pokemon');
            setFetchedOptions(pockemons.data.results);
        };
        fetchPockemons();
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-[50%] px-5 py-7 border-2 rounded-md mx-auto mt-[200px] shadow-md">
            <label className="font-bold flex flex-col gap-2">
                First Name
                <input
                    placeholder="John"
                    type="text"
                    {...register('firstName')}
                    className="font-normal text-[#797979] border-black-800 border-2 rounded-md p-2 hover:border-blue-800 focus:border-blue-800 outline-none"
                />
            </label>
            <label className="font-bold flex flex-col gap-2">
                Last Name
                <input
                    placeholder="Salivan"
                    type="text"
                    {...register('lastName')}
                    className="font-normal text-[#797979] border-black-800 border-2 rounded-md p-2 hover:border-blue-800 focus:border-blue-800 outline-none"
                />
            </label>
            <label className="font-bold flex flex-col gap-2">
                Team
                <Controller
                    name="pockemons"
                    control={control}
                    render={({ field }) => (
                        <Select
                            className="font-normal"
                            {...field}
                            options={fetchedOptions}
                            isMulti
                            getOptionLabel={(option: IOption) => option.name}
                            getOptionValue={(option: IOption) => option.url}
                        />
                    )}
                />
            </label>
            <button
                type="submit"
                className="bg-[#0045cf] text-white mt-3 mx-auto px-5 py-2 rounded-md hover:bg-[#3368d2] focus:bg-[#3368d2]">
                Create Team
            </button>
        </form>
    );
};

export default Form;
