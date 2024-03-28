import React, { useState, useContext, useEffect } from "react";
import Context from "../Context";
import srch from "../assets/search.svg";
import "./Searchbar.sass";

const Searchbar = () => {
  const [val, setVal] = useState("");
  const [stat, setStat] = useState(false);
  const word = useContext(Context);
  const inputbox = document.querySelector("#gsearch");

  useEffect(() => {
    if (inputbox) {
      setVal(inputbox.value);
      word(inputbox.value);
    }
    setStat(false);
  }, [stat, setStat]);

  useEffect(() => {
    setVal("");
  }, [word]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setStat(true);
    }
  };

  return (
    <div className="search-box">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="search_box"
      >
        <label htmlFor="gsearch">
          <img
            src={srch}
            className="search_icon"
            alt="icon"
            onClick={() => setStat(true)}
          />
        </label>
        <input
          defaultValue={val}
          type="search"
          id="gsearch"
          name="gsearch"
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

export default Searchbar;
