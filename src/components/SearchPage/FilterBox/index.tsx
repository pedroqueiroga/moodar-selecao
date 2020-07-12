import React, { Dispatch, useState, useEffect } from 'react';

import classNames from 'classnames';

import { Category, TCategory } from '../../../models/ActionModel';
import Box from '../../Box';

import { Set } from 'immutable';

import styles from './FilterBox.module.css';
import buttonStyles from '../../Button.module.css';

export type TFilterState = {
    capacity: number,
    duration: {
        min: number,
        max: number
    }
    categories: Set<string>,
};

export type TFilterAction =
    | { type: 'include_cat', payload: string }
    | { type: 'remove_cat', payload: string }
    | { type: 'change_capacity', payload: number }
    | {
        type: 'change_duration', payload: {
            min: number,
            max: number,
        }
    }

export function filterReducer(state: TFilterState, action: TFilterAction) {
    // Typescript is kinda acting up.
    // state.categories should never arrive as something other than a set
    // but sometimes it does.
    const cat: Set<string> = validateSet(state.categories);
    switch (action.type) {
        case 'include_cat':
            return {
                ...state,
                categories: cat.add(action.payload)
            };
        case 'remove_cat':
            return {
                ...state,
                categories: cat.delete(action.payload)
            };
        case 'change_capacity':
            return { ...state, capacity: action.payload };
        case 'change_duration':
            return { ...state, duration: action.payload };
        default:
            throw new Error('Undefined type of action');
    }
}

function validateSet(s: any): Set<string> {
    return Set.isSet(s) ? s : Set<string>();
}

function FilterBox({ initialState, changeFilters }: {
    initialState: TFilterState,
    changeFilters: Dispatch<TFilterAction>,
}) {

    const [duration, setDuration] = useState({
        min: initialState.duration?.min || NaN,
        max: initialState.duration?.max || NaN,
    });
    const [capacity, setCapacity] = useState(initialState.capacity || NaN);

    const [categories, setCategories] = useState(
        validateSet(initialState.categories)
    );

    useEffect(() => {
        changeFilters({ type: 'change_capacity', payload: capacity });
    }, [capacity, changeFilters]);

    useEffect(() => {
        changeFilters({ type: 'change_duration', payload: { ...duration } });
    }, [duration, changeFilters]);

    function getMembers(catsEnum: TCategory): string[] {
        return Object.keys(catsEnum).map(key => catsEnum[key])
    };

    const allCategories = getMembers(Category);

    function onCheckHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const cat: string = allCategories[parseInt(e.target.id)];
        if (e.target.checked) {
            setCategories(categories.add(cat));
            changeFilters({
                type: 'include_cat',
                payload: cat,
            });
        } else {
            setCategories(categories.delete(cat));
            changeFilters({
                type: 'remove_cat',
                payload: cat,
            });
        }
    }

    function onCapacityChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newCapacity: number = parseInt(e.currentTarget.value)
        setCapacity(newCapacity);
    }

    function onMinDurationChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newMin: number = parseInt(e.currentTarget.value);
        const newMax = duration.max < newMin ? newMin : duration.max;
        setDuration({ max: newMax, min: newMin });
    }

    function onMaxDurationChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newMax: number = parseInt(e.currentTarget.value);
        setDuration({ ...duration, max: newMax });
    }

    function validateNumber(n: number) {
        return isNaN(n) ? '' : n.toString();
    }

    return (
        <div>
            <Box title="Audiência">
                <span>Número máximo de pessoas: </span>
                <input
                    className={styles.inputNumber}
                    type="number"
                    min={0}
                    value={validateNumber(capacity)}
                    onChange={onCapacityChangeHandler}
                />
                <input
                    type="button"
                    value="X"
                    className={classNames(
                        buttonStyles.button,
                        styles.cleanFilter,
                    )}
                    onClick={() => setCapacity(NaN)}
                />
            </Box>
            <Box title="Duração">

                <input
                    className={styles.inputNumber}
                    type="number"
                    min={0}
                    value={validateNumber(duration.min)}
                    onChange={onMinDurationChangeHandler}
                />
                <input
                    type="button"
                    value="X"
                    className={classNames(
                        buttonStyles.button,
                        styles.cleanFilter,
                    )}
                    onClick={() => setDuration({ ...duration, min: NaN })}
                />
                <br />
                <span> a </span>
                <br />
                <input
                    className={styles.inputNumber}
                    type="number"
                    min={validateNumber(duration.min) || 0}
                    value={validateNumber(duration.max)}
                    onChange={onMaxDurationChangeHandler}
                />
                <input
                    type="button"
                    value="X"
                    className={classNames(
                        buttonStyles.button,
                        styles.cleanFilter,
                    )}
                    onClick={() => setDuration({ ...duration, max: NaN })}
                />
                <span> minutos.</span>
            </Box>
            <Box title="Categorias">
                {allCategories.map((cat, idx) => (
                    <label
                        className={styles.checkboxContainer}
                        key={idx}
                        htmlFor={cat}>{cat}
                        <input
                            type="checkbox"
                            id={idx.toString()}
                            name={cat}
                            checked={categories.includes(cat)}
                            onChange={onCheckHandler}
                        />
                    </label>
                ))}
            </Box>
        </div>
    );
}

export default FilterBox;
