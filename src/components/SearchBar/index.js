import React, { useRef } from "react";
import debounce from "lodash.debounce";

import "./SearchBar.scss";

const SearchBar = (props) => {
    const searchControl = useRef(null);
    const onInputHandler = debounce(() => {
        props.subsriber(searchControl.current.value);
    }, 300);

    return (
        <section className="search-bar">
            <div className="search-bar__inner-wrapper">
                <div className="search-bar__input-b">
                    <input
                        ref={searchControl}
                        type="text"
                        className="search-bar__input"
                        placeholder="Type something..."
                        onInput={onInputHandler}
                    />
                </div>
            </div>
        </section>
    );
};

export default SearchBar
