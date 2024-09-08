import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { ContextProps } from '@/types'

export default function MatchDaySelector({ context }: ContextProps) {
    const location = useLocation();
    const fechas = Array.from({ length: context.matchday.max }, (_, i) => i + 1);
    const [selected, setSelected] = useState(fechas[context.matchday.current - 1]);
    useEffect(() => {
        const match = location.pathname.match(/\/fecha\/(\d+)/);
        const selectedDate = match ? parseInt(match[1], 10) : context.matchday.current;

        // Verifica si la fecha detectada es diferente a la seleccionada actualmente.
        if (fechas.includes(selectedDate) && selectedDate !== selected) {
            setSelected(selectedDate);
        }
    }, [location.pathname, fechas, selected, context.matchday.current]);

    const to = (fecha: number) => {
        const path = location.pathname.split('/')[1];

        if (path === '') {
            return fecha === context.matchday.current ? '/' : `/fecha/${fecha}`;
        } else if (path === 'fecha') {
            return fecha === context.matchday.current ? '/' : `/fecha/${fecha}`;
        } else if (path === 'participar' && location.pathname.split('/')[2] === 'fecha') {
            return `/participar/fecha/${fecha}`;
        } else {
            return '/';
        }
    };

    return (
        <Listbox value={selected} onChange={setSelected}>
            <Label className="block text-sm font-medium leading-6 text-gray-900">Fechas</Label>
            <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                        <img alt="" src={`https://dummyimage.com/64x64/c9c9c9/000000.png&text=${selected}`} className="h-5 w-5 flex-shrink-0 rounded-full" />
                        <span className="ml-3 block truncate">Fecha {selected}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {fechas.map((fecha) => (
                        <Link key={"fecha-" + fecha} to={to(fecha)}>
                            <ListboxOption
                                value={fecha}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-green-600 data-[focus]:text-white"
                            >
                                <div className="flex items-center">
                                    <img alt="" src={`https://dummyimage.com/64x64/c9c9c9/000000.png&text=${fecha}`} className="h-5 w-5 flex-shrink-0 rounded-full" />
                                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                        Fecha {fecha}
                                    </span>
                                </div>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-green-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                </span>
                            </ListboxOption>
                        </Link>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
