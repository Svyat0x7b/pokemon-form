import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';
import Select from 'react-select';
import hiddenEye from '../../public/images/hidden-eye.png';
import eye from '../../public/images/hidden-eye.png';
import infoIcon from '../../public/images/info.png';
export interface IFormProps {
    onSetTeam: (data: IFormInput) => void;
    onOpenModal: (isOpen: boolean) => void;
    onFetchPockemonsDetails: () => void;
}
export interface IFormInput {
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

const customStyles = {
    multiValue: (base: any) => ({
        ...base,
        backgroundColor: '#a9c5ff',
        borderRadius: '12px',
        overflow: 'hidden',
    }),
    multiValueLabel: (base: any) => ({
        ...base,
        color: '#000',
        fontWeight: '600',
    }),
    multiValueRemove: (base: any) => ({
        ...base,
        color: '#0045cf',
        ':hover': {
            backgroundColor: '#bbd1ff',
        },
    }),
};

const Form: React.FC<IFormProps> = ({ onSetTeam, onOpenModal, onFetchPockemonsDetails }) => {
    const [isFnVisible, setIsFnVisible] = useState<boolean>(true);
    const [isLnVisible, setIsLnVisible] = useState<boolean>(true);
    const [fetchedOptions, setFetchedOptions] = useState<IOption[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isSelectEmpty, setIsSelectEmpty] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<IFormInput>();

    useEffect(() => {
        const fetchPockemons = async () => {
            const pockemons = await axios.get('https://pokeapi.co/api/v2/pokemon');
            setFetchedOptions(pockemons.data.results);
        };
        fetchPockemons();
    }, []);

    const toggleFnVisibility = () => {
        setIsFnVisible((prevState) => !prevState);
    };
    const toggleLnVisibility = () => {
        setIsLnVisible((prevState) => !prevState);
    };

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (errors.firstName || errors.lastName || !selectedOptions.length) {
            setIsDisabled(true);
            return;
        }
        onSetTeam({ ...data, pockemons: selectedOptions });
        onOpenModal(true);
        reset(defaultValues);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-[50%] px-5 py-7 border-2 rounded-md mx-auto mt-[20px] shadow-md">
            <label className="font-bold flex flex-col gap-2 relative">
                First Name
                <input
                    placeholder="John"
                    type={isFnVisible ? 'text' : 'password'}
                    {...register('firstName', {
                        maxLength: 12,
                        minLength: 2,
                        required: true,
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: 'invalid first name',
                        },
                    })}
                    className={`font-normal text-[#6a6a6a] border-black-800 border-2 rounded-md p-2 hover:border-blue-800 focus:border-blue-800 outline-none ${
                        errors.firstName && `border-[#cc0000]`
                    }`}
                />
                <button onClick={toggleFnVisibility} className="absolute right-5 top-[46px]">
                    <img src={isFnVisible ? hiddenEye : eye} alt="eye" className="w-[15px]" />
                </button>
                {errors.firstName && (
                    <p className="text-[#cc0000] text-[10px] font-normal">
                        The firstname must contain only letter have more 2 symbols
                    </p>
                )}
            </label>
            <label className="font-bold flex flex-col gap-2 relative">
                Last Name
                <input
                    placeholder="Salivan"
                    type={isLnVisible ? 'text' : 'password'}
                    {...register('lastName', {
                        maxLength: 12,
                        minLength: 2,
                        required: true,
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: 'invalid last name',
                        },
                    })}
                    className={`font-normal text-[#6a6a6a] border-black-800 border-2 rounded-md p-2 hover:border-blue-800 focus:border-blue-800 outline-none ${
                        errors.lastName && `border-[#cc0000]`
                    }`}
                />
                <button
                    onClick={toggleLnVisibility}
                    className={`absolute right-5 top-[46px] w-fit ${
                        !isLnVisible && 'border-[#cc0000]'
                    }`}>
                    <img src={isLnVisible ? hiddenEye : eye} alt="eye" className="w-[15px]" />
                </button>
                {errors.lastName && (
                    <p className="text-[#cc0000] text-[10px] font-normal">
                        The lastname must contain only letter have more 2 symbols
                    </p>
                )}
            </label>
            <label className="font-bold flex flex-col gap-2">
                <div className="flex justify-between">
                    <span>Team</span>
                    <span className="flex items-center gap-1 font-normal text-[#a5a5a5]">
                        Optional
                        <img src={infoIcon} alt="info" className="w-[15px]" />
                    </span>
                </div>
                <Controller
                    name="pockemons"
                    control={control}
                    render={({ field }) => (
                        <Select
                            className={`font-normal ${
                                !selectedOptions.length && `border-[#cc0000]`
                            }`}
                            {...field}
                            options={fetchedOptions}
                            value={selectedOptions}
                            //@ts-ignore
                            onChange={(options: IOption[]) => {
                                setIsDisabled(false);
                                setSelectedOptions(options);
                            }}
                            isMulti
                            getOptionLabel={(option: IOption) => option.name}
                            getOptionValue={(option: IOption) => option.url}
                            isOptionDisabled={(option: IOption) => selectedOptions.length > 3}
                            styles={customStyles}
                        />
                    )}
                />
                {isDisabled && (
                    <p className="text-[#cc0000] text-[10px] font-normal">
                        You have to choose at least one hero!
                    </p>
                )}
            </label>
            <button
                disabled={isDisabled}
                type="submit"
                className="bg-[#0045cf] text-white mt-3 mx-auto px-5 py-2 rounded-md hover:bg-[#3368d2] focus:bg-[#3368d2] disabled:cursor-not-allowed disabled:bg-[#b9c8e7]">
                Create Team
            </button>
        </form>
    );
};

export default Form;
