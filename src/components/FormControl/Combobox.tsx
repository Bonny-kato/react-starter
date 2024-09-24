import { Combobox, Transition } from "@headlessui/react";
import {
    CheckCircleIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
    createContext,
    Dispatch,
    FC,
    Fragment,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Control, Controller } from "react-hook-form";
import {
    ErrorIcon,
    inputClassNames,
} from "~/components/FormControl/Common.tsx";
import Label from "~/components/FormControl/Label.tsx";
import Hide from "~/components/Hide.tsx";
import { LoadingCircle } from "~/components/Icons";
import useDebouncedInputChangeHandler from "~/hooks/useDebouncedInputChangeHandler.ts";

import { cn } from "~/utils";
import { SelectInputOptionType as OptionType } from "~/utils/zodCommon.ts";

interface InputProps {
    className?: string;
    options?: OptionType[];
    defaultValue?: OptionType;
    hasError?: boolean;
    name?: string;
    onChange?: (selected: OptionType) => void;
    onBlur?: () => void;
    placeholder?: string;
    onInputChange?: (value: string) => void;
}

interface ComboboxProps extends InputProps {
    options?: OptionType[];
    loading?: boolean;
    label: string;
    labelClassName?: string;
    wrapperClassName?: string;
    showErrMessage?: boolean;
    emptyDataMessage?: string;
}

interface ComboboxContextType
    extends Omit<
        ComboboxProps,
        "wrapperClassName" | "labelClassName" | "label"
    > {
    setQuery: Dispatch<string>;
    query: string;
    selectedOption?: OptionType;
    setSelectedOption: Dispatch<OptionType>;
    filteredOptions: OptionType[];
}

const ComboboxContext = createContext<ComboboxContextType | null>(null);

const useComboboxContext = () => {
    const context = useContext(ComboboxContext);
    if (!context) {
        throw new Error(
            "useComboboxContext must be used within a ComboboxContextProvider",
        );
    }
    return context;
};

const Input = () => {
    const {
        onBlur: handleBlur,
        setQuery,
        placeholder = "Type to search...",
        className,
        hasError,
        onInputChange,
    } = useComboboxContext();

    const handleChange = useDebouncedInputChangeHandler((value) => {
        setQuery(value);
        onInputChange?.(value);
    }, 500);
    return (
        <Combobox.Input
            onBlur={handleBlur}
            autoComplete="off"
            className={cn(inputClassNames, className, {
                "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30":
                    hasError,
            })}
            onChange={handleChange}
            displayValue={(option: OptionType) => option.label}
            placeholder={placeholder}
        />
    );
};

const OptionsOpenTransition: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            {children}
        </Transition>
    );
};

const ShowOptionsButton = () => {
    return (
        <Combobox.Button className="absolute bottom-0 right-2 top-0 my-auto">
            <ChevronUpDownIcon className="h-6 w-6 text-gray-400" />
        </Combobox.Button>
    );
};

const Option: FC<{ option: OptionType }> = ({ option }) => {
    return (
        <Combobox.Option
            as="li"
            className="cursor-pointer text-sm shadow-sm"
            value={option}
        >
            {({ active, selected }) => (
                <p
                    className={`${active ? "bg-black/5 text-black" : ""} text-dark2 flex items-center space-x-2 px-3 py-2 capitalize`}
                >
                    <CheckCircleIcon
                        className={`text-green-600 ${selected ? "opacity-100" : "opacity-0"} h-5 w-5`}
                    />
                    <span>{option.label}</span>
                </p>
            )}
        </Combobox.Option>
    );
};

const DataLoading = () => {
    return (
        <div className="center gap-2 py-3 text-sm">
            <LoadingCircle className={"size-4"} />
            <p className={"text-muted"}>loading data ...</p>
        </div>
    );
};

const EmptyStateData = () => {
    const { emptyDataMessage = "There are no options ..." } =
        useComboboxContext();
    return (
        <div className="py-3 text-center text-sm text-gray-500">
            {emptyDataMessage}
        </div>
    );
};

const OptionsContainer = () => {
    const { filteredOptions, loading = false } = useComboboxContext();

    return (
        <OptionsOpenTransition>
            <Combobox.Options className="border-light-gray absolute top-full z-40 mt-2 max-h-52 w-full overflow-y-auto rounded-[5px] border-[1.4px] border-swiss-coffee bg-white py-2 shadow">
                <Hide condition={!loading}>
                    <DataLoading />
                </Hide>
                <Hide condition={loading}>
                    {filteredOptions.map((option) => (
                        <Option option={option} key={option.value} />
                    ))}
                </Hide>

                <Hide condition={!!filteredOptions.length || loading}>
                    <EmptyStateData />
                </Hide>
            </Combobox.Options>
        </OptionsOpenTransition>
    );
};

const InputContainer = () => {
    const { hasError } = useComboboxContext();
    return (
        <div className="relative">
            <Input />
            <ShowOptionsButton />
            {hasError && <ErrorIcon />}

            <OptionsContainer />
        </div>
    );
};

const ComboboxInput: FC<ComboboxProps> = (props) => {
    const {
        defaultValue,
        options = [],
        label,
        labelClassName,
        wrapperClassName,
        onChange,
        ...rest
    } = props;

    const [query, setQuery] = useState("");

    const [selectedOption, setSelectedOption] = useState<
        OptionType | undefined
    >(defaultValue);

    useEffect(() => {
        if (selectedOption) onChange?.(selectedOption);
    }, [selectedOption]);

    const filteredOptions = useMemo(() => {
        return query === ""
            ? options
            : options.filter((option) =>
                  option.label.toLowerCase().includes(query.toLowerCase()),
              );
    }, [options, query]);

    return (
        <ComboboxContext.Provider
            value={{
                query,
                selectedOption,
                setQuery,
                setSelectedOption,
                ...rest,
                defaultValue,
                options,
                filteredOptions,
            }}
        >
            <Combobox
                value={selectedOption}
                // @ts-expect-error kato-ui knows better
                onChange={selectedOption}
                as={"div"}
                className={cn("space-y-1", wrapperClassName)}
            >
                {label && <Label label={label} className={labelClassName} />}
                <InputContainer />
            </Combobox>
        </ComboboxContext.Provider>
    );
};

export interface ComboboxFormInputProps extends ComboboxProps {
    control: Control;
    name: string;
    label: string;
}

export const ComboboxFormInput: FC<ComboboxFormInputProps> = ({
    control,
    name,
    ...rest
}) => {
    return (
        <Controller
            render={({ field: { onBlur, onChange } }) => (
                <ComboboxInput {...rest} onChange={onChange} onBlur={onBlur} />
            )}
            name={name}
            control={control}
        />
    );
};
