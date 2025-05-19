import styled from 'styled-components';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ReactComponent as ChevronUp } from '../../assets/select/ChevronUp.svg';
import { ReactComponent as ChevronDown } from '../../assets/select/ChevronDown.svg';
import { ReactComponent as Cross } from '../../assets/select/Cross.svg';

export function CustomSelect({
  value,
  options,
  onSelect,
  placeholder = 'Select'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHoveringClear, setIsHoveringClear] = useState(false);
  const wrapperRef = useRef(null);

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleClearClick = useCallback(
    (e) => {
      e.stopPropagation();
      onSelect(null);
    },
    [onSelect]
  );

  const handleMouseEnterClear = useCallback(() => setIsHoveringClear(true), []);
  const handleMouseLeaveClear = useCallback(
    () => setIsHoveringClear(false),
    []
  );

  const handleOptionClick = useCallback(
    (e) => {
      const selectedValue = e.currentTarget.dataset.value;
      onSelect(selectedValue);
      setIsOpen(false);
    },
    [onSelect]
  );

  const handleOptionMouseEnter = useCallback((e) => {
    const index = Number(e.currentTarget.dataset.index);
    setHoveredIndex(index);
  }, []);

  const selectedLabel = value
    ? options.find((opt) => opt.value === value)?.label
    : placeholder;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <SelectBox onClick={toggleDropdown} $active={isOpen}>
        <span>{selectedLabel}</span>
        {value ? (
          <CrossIcon
            onClick={handleClearClick}
            onMouseEnter={handleMouseEnterClear}
            onMouseLeave={handleMouseLeaveClear}
            $hovered={isHoveringClear}
          />
        ) : isOpen ? (
          <ChevronUp />
        ) : (
          <ChevronDown />
        )}
      </SelectBox>
      {isOpen && (
        <Dropdown>
          <OptionsList>
            {options.map((opt, index) => (
              <Option
                key={opt.value}
                data-value={opt.value}
                data-index={index}
                onClick={handleOptionClick}
                onMouseEnter={handleOptionMouseEnter}
                $hovered={hoveredIndex === index}
                $selected={opt.value === value}
              >
                {opt.label}
              </Option>
            ))}
          </OptionsList>
        </Dropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectBox = styled.div`
  padding: 10px 12px;
  border: 2px solid #72aa43;
  border-radius: 6px;
  font-size: 14px;
  background-color: ${({ $active }) => ($active ? '#3a4e6e' : '#263750')};
  color: #667562;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #3a4e6e;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  background-color: white;
  border-radius: 7px;
  z-index: 10;
  margin-top: 5px;
  overflow: hidden;
`;

const OptionsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: ${5 * 38}px;
  overflow-y: auto;
`;

const Option = styled.li`
  padding: 10px 12px;
  cursor: pointer;
  color: #263750;
  background-color: ${({ $hovered }) => ($hovered ? '#d4efc5' : 'white')};
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};
  height: 38px;
  box-sizing: border-box;

  &:hover {
    background-color: #d4efc5;
  }
`;

const CrossIcon = styled(Cross)`
  cursor: pointer;

  path {
    fill: ${({ $hovered }) => ($hovered ? '#72aa43' : '#667562')};
    transition: fill 0.2s ease;
  }

  &:hover {
    path {
      fill: #72aa43;
    }
  }
`;
