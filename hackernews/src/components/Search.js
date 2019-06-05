import React from 'react';

export const SearchComp = ({ value, onChange, children }) =>
    <form>
        {children}
        <input
            type="text"
            value={value}
            onChange={onChange} />
    </form>

// export default SearchComp