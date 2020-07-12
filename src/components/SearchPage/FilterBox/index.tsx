import React, { Dispatch, useState, useEffect } from 'react';

import classNames from 'classnames';

import { Category, TCategory } from '../../../models/ActionModel';
import Box from '../../Box';

import { Set } from 'immutable';

import styles from './FilterBox.module.css';
import buttonStyles from '../../Button.module.css';

export type TFilterState = {
    capacity: number | undefined,
    duration: {
        min: number | undefined,
        max: number | undefined
    } | undefined,
    categories: Set<string>
};

export type TFilterAction =
    | { type: 'include_cat', payload: string }
    | { type: 'remove_cat', payload: string }
    | { type: 'change_capacity', payload: number }
    | {
        type: 'change_duration', payload: {
            min: number | undefined,
            max: number | undefined
        }
    }

export function filterReducer(state: TFilterState, action: TFilterAction) {
    switch (action.type) {
        case 'include_cat':
            return {
                ...state,
                categories: state.categories.add(action.payload)
            };
        case 'remove_cat':
            return {
                ...state,
                categories: state.categories.delete(action.payload)
            };
        case 'change_capacity':
            return { ...state, capacity: action.payload };
        case 'change_duration':
            return { ...state, duration: action.payload };
        default:
            throw new Error('Undefined type of action');
    }
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

    const [categories, setCategories] = useState(initialState.categories);

    useEffect(() => {
        console.log('duration', duration);
        console.log('capacity', capacity);
    });

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
        if (e.target.checked) {
            changeFilters({
                type: 'include_cat',
                payload: allCategories[parseInt(e.target.id)]
            });
        } else {
            changeFilters({
                type: 'remove_cat',
                payload: allCategories[parseInt(e.target.id)]
            });
        }
    }

    function onCapacityChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newCapacity: number = parseInt(e.target.value)
        setCapacity(newCapacity);
    }

    function onMinDurationChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newMin: number = parseInt(e.target.value);
        const newMax = duration.max < newMin ? newMin : duration.max;
        setDuration({ max: newMax, min: newMin });
    }

    function onMaxDurationChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newMax: number = parseInt(e.target.value);
        setDuration({ ...duration, max: newMax });
    }

    return (
        <div>
            <Box title="Audiência">
                <span>Número máximo de pessoas: </span>
                <input
                    className={styles.inputNumber}
                    type="number"
                    min={0}
                    value={capacity.toString()}
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
                    value={duration.min.toString()}
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
                    min={duration.min.toString()}
                    value={duration.max.toString()}
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
                            checked={initialState.categories?.includes(cat)}
                            onChange={onCheckHandler}
                        />
                    </label>
                ))}
            </Box>
        </div>
    );
}

export default FilterBox;
