import React, { Dispatch } from 'react';
import { Category, TCategory } from '../../../models/ActionModel';


function FilterBox({ changeFilters }: { changeFilters: Dispatch<any> }) {

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

    return (
        <div>
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
        </div>
    );
}

export default FilterBox;
