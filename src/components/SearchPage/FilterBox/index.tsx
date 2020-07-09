import React, { Dispatch, useState, useEffect } from 'react';
import { Category, TCategory } from '../../../models/ActionModel';
import Box from '../../Box';

import styles from './FilterBox.module.css';

function FilterBox({ changeFilters }: { changeFilters: Dispatch<any> }) {

    const [duration, setDuration] = useState({ min: NaN, max: NaN });
    const [capacity, setCapacity] = useState(NaN);

    useEffect(() => {
        console.log('duration', duration);
        console.log('capacity', capacity);
    });

    function getMembers(catsEnum: TCategory): string[] {
        return Object.keys(catsEnum).map(key => catsEnum[key])
    };

    const categories = getMembers(Category);

    function onCheckHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            changeFilters({ type: 'include_cat', payload: categories[parseInt(e.target.id)] });
        } else {
            changeFilters({ type: 'remove_cat', payload: categories[parseInt(e.target.id)] });
        }
    }

    function onCapacityChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const newCapacity: number = parseInt(e.target.value)
        setCapacity(newCapacity);
        changeFilters({ type: 'change_capacity', payload: newCapacity });
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
            </Box>
            <Box title="Duração">

                <input
                    className={styles.inputNumber}
                    type="number"
                    min={0}
                    value={duration.min.toString()}
                    onChange={onMinDurationChangeHandler}
                />
                <span> a </span>
                <input
                    className={styles.inputNumber}
                    type="number"
                    min={duration.min.toString()}
                    value={duration.max.toString()}
                    onChange={onMaxDurationChangeHandler}
                />
                <span> minutos.</span>
            </Box>
            <Box title="Categorias">
                {categories.map((cat, idx) => (
                    <div key={idx}>
                        <input
                            type="checkbox"
                            id={idx.toString()}
                            name={cat}
                            onChange={onCheckHandler}
                        />
                        <label htmlFor={cat}>{cat}</label>
                    </div>
                ))}
            </Box>
        </div>
    );
}

export default FilterBox;
