import { FC, Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import {
    CheckCircleIcon,
    ChevronUpDownIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import SpinLoader from "@/components/loaders/spinner";
import { twMerge } from "tailwind-merge";

export interface ComboboxOption {
    id: string;

    [key: string]: string;
}

export interface ComboboxProps {
    className?: string;
    options?: ComboboxOption[];
    defaultValue?: ComboboxOption | ComboboxOption[];
    multiple?: boolean;
    displayName: string;
    loading?: boolean;
    label?: string;
    labelClassName?: string;
    wrapperClass?: string;
    reset?: boolean;
    showErrMessage?: boolean;
    hasError?: boolean;
    name?: string;
    emptyDataMessage?: string;
    onChange?: (selected: any) => void;
    onBlur?: () => void;
}

const ComboboxInput: FC<ComboboxProps> = ({
    className,
    labelClassName,
    wrapperClass,
    emptyDataMessage,
    options = [],
    defaultValue = [],
    onChange: handleChange,
    name,
    hasError = false,
    multiple = false,
    displayName,
    showErrMessage = false,
    loading = false,
    reset = false,
    onBlur: handleBlur,
    label,
}) => {
    const [query, setQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState<
        ComboboxOption | ComboboxOption[]
    >(defaultValue);

    useEffect(() => {
        if (handleChange) {
            handleChange(selectedOption);
        }
    }, [selectedOption]);

    // filter options by compare a given displayName with a search query typed from the input box
    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) => {
                  return option[displayName]
                      ?.toLowerCase()
                      .includes(query.toLowerCase());
              });

    const inputClass = `
        w-full text-gray-900 shadow-sm ring-transparent ring-2 2xl:ring-4  enable-transition  
                        focus:outline-none font-normal tracking-wider py-2 border-[1.4px] xl:text-base md:text-sm  md:py-2.5 lg:py-2 sm:text-sm sm:leading-6     
        ${
            hasError
                ? "border-primary focus:ring-primary/30 focus:border-primary"
                : "border-gray-300 focus:border-black focus:ring-black/40"
        }
      rounded-[5px] overflow-hidden
                       placeholder-gray-400 placeholder:font-light placeholder:text-sm`;

    const getDisplayValue = () => {
        if (multiple) {
            return {
                displayValue: (options: any) => {
                    return options
                        .map((optionItem: any) => optionItem[displayName])
                        .join(", ");
                },
            };
        } else {
            return {
                displayValue: (option: any) => option[displayName],
            };
        }
    };

    return (
        <Combobox<ComboboxOption>
            // @ts-ignore
            value={selectedOption}
            onChange={setSelectedOption}
            // @ts-ignore
            multiple={multiple}
        >
            <div className={twMerge("space-y-1 ", wrapperClass)}>
                <label
                    htmlFor={name}
                    className={twMerge(
                        "block text-sm font-medium leading-6 text-gray-900",
                        labelClassName
                    )}
                >
                    {label}
                </label>
                <div className={"relative"}>
                    <Combobox.Input
                        onBlur={handleBlur}
                        id={name}
                        autoComplete={"off"}
                        className={twMerge(inputClass, className)}
                        onChange={(event) => setQuery(event.target.value)}
                        {...getDisplayValue()}
                    />
                    <Combobox.Button
                        className={"absolute right-2 top-0 bottom-0 my-auto"}
                    >
                        <ChevronUpDownIcon
                            className={"text-gray-400 h-6 w-6"}
                        />
                    </Combobox.Button>

                    {hasError ? (
                        <ExclamationCircleIcon
                            className={
                                "absolute right-8 top-0 h-5 w-5 text-red-500 bottom-0 my-auto"
                            }
                        />
                    ) : null}
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Combobox.Options
                            as="ul"
                            className={
                                "bg-white max-h-52 overflow-y-auto absolute top-full z-40 w-full shadow-base border-[1.4px]  border-light-gray py-2 rounded-[5px] mt-2"
                            }
                        >
                            {loading ? (
                                <div className={"py-3 center"}>
                                    <SpinLoader className={"border-[2.5px]"} />
                                </div>
                            ) : filteredOptions.length ? (
                                filteredOptions.map((item) => (
                                    <Combobox.Option
                                        as="li"
                                        key={item.id}
                                        className={
                                            "text-sm shadow-sm cursor-pointer"
                                        }
                                        value={item}
                                    >
                                        {({ active, selected }) => (
                                            <p
                                                className={`${
                                                    active
                                                        ? "bg-black/5 text-black"
                                                        : ""
                                                } flex items-center capitalize text-dark2 space-x-2 px-3 py-2`}
                                            >
                                                <CheckCircleIcon
                                                    className={`text-green-600 ${
                                                        selected
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    } h-5 w-5`}
                                                />
                                                <span>{item[displayName]}</span>
                                            </p>
                                        )}
                                    </Combobox.Option>
                                ))
                            ) : (
                                <div
                                    className={
                                        "py-3 text-center text-sm text-gray-500"
                                    }
                                >
                                    {emptyDataMessage ??
                                        "There are no options ..."}
                                </div>
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>

                {hasError && showErrMessage ? (
                    <p className={"text-red-500 pt-1 text-sm"}>
                        Please select {name}
                    </p>
                ) : null}
            </div>
        </Combobox>
    );
};
export default ComboboxInput;
