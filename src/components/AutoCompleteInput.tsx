import React, { useState, useEffect } from "react";
import Chip from "./Chip";

interface Item {
  label: string;
  imageUrl: string;
}

const dummyData: Item[] = [
  {
    label: "Ana Trujillo",
    imageUrl:
      "https://hindubabynames.info/wp-content/themes/hbn_download/download/logistics-companies/zepto-logo.png",
  },
  {
    label: "Christina Berglund",
    imageUrl:
      "https://hindubabynames.info/wp-content/themes/hbn_download/download/logistics-companies/zepto-logo.png",
  },
  {
    label: "Antonio Moreno",
    imageUrl:
      "https://hindubabynames.info/wp-content/themes/hbn_download/download/logistics-companies/zepto-logo.png",
  },
  {
    label: "Hanna Moos",
    imageUrl:
      "https://hindubabynames.info/wp-content/themes/hbn_download/download/logistics-companies/zepto-logo.png",
  },
  {
    label: "Thomas Hardy",
    imageUrl:
      "https://hindubabynames.info/wp-content/themes/hbn_download/download/logistics-companies/zepto-logo.png",
  },
  {
    label: "Maria Anders",
    imageUrl:
      "https://hindubabynames.info/wp-content/themes/hbn_download/download/logistics-companies/zepto-logo.png",
  },
];

const InputComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>(dummyData);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setFilteredItems(
      dummyData.filter(
        (item) =>
          item.label.toLowerCase().includes(inputValue.toLowerCase()) &&
          !selectedItems.map((si) => si.label).includes(item.label)
      )
    );
  }, [selectedItems, inputValue]);

  const handleSelectItem = (item: Item) => {
    setSelectedItems([...selectedItems, item]);
    setInputValue("");
    setIsFocused(false);
  };

  const handleDeleteChip = (chipLabel: string) => {
    setSelectedItems(selectedItems.filter((item) => item.label !== chipLabel));
  };
  return (
    <div className="autocomplete-wrapper" onClick={() => setIsFocused(true)}>
      <div className="chips-input-container">
        {selectedItems.map((item, index) => (
          <div key={index} className="chip">
            <img src={item.imageUrl} alt={item.label} className="chip-image" />
            <span>{item.label}</span>
            <button
              onClick={() => handleDeleteChip(item.label)}
              className="chip-delete"
            >
              ✕
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="input-field"
          placeholder={selectedItems.length === 0 ? "Start typing..." : ""}
        />
      </div>
      <div>
        {isFocused && filteredItems.length > 0 && (
          <ul className="suggestions-list">
            {filteredItems.map((item) => (
              <li
                key={item.label}
                onClick={() => handleSelectItem(item)}
                className="suggestion-item"
              >
                <img
                  src={item.imageUrl}
                  alt={item.label}
                  className="suggestion-image"
                />
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
