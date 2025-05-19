import styled from 'styled-components';
import { useCallback, useState, useEffect } from 'react';
import { useFilters } from '../providers';
import { CustomSelect } from '../common';

export function Filters() {
  const { filters, updateFilters, resetFilters } = useFilters();

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onApply = useCallback(() => {
    updateFilters(localFilters);
  }, [localFilters, updateFilters]);

  const handleStatusChange = useCallback((val) => {
    setLocalFilters((prev) => ({ ...prev, status: val }));
  }, []);

  const handleGenderChange = useCallback((val) => {
    setLocalFilters((prev) => ({ ...prev, gender: val }));
  }, []);

  const handleSpeciesChange = useCallback((val) => {
    setLocalFilters((prev) => ({ ...prev, species: val }));
  }, []);

  return (
    <FiltersContainer>
      <FilterRow>
        <FilterGroup>
          <CustomSelect
            value={localFilters.status}
            options={[
              { value: '', label: 'Any' },
              { value: 'alive', label: 'Alive' },
              { value: 'dead', label: 'Dead' },
              { value: 'unknown', label: 'Unknown' }
            ]}
            onSelect={handleStatusChange}
            placeholder="Status"
          />
        </FilterGroup>

        <FilterGroup>
          <CustomSelect
            value={localFilters.gender}
            options={[
              { value: '', label: 'Any' },
              { value: 'female', label: 'Female' },
              { value: 'male', label: 'Male' },
              { value: 'genderless', label: 'Genderless' },
              { value: 'unknown', label: 'Unknown' }
            ]}
            onSelect={handleGenderChange}
            placeholder="Gender"
          />
        </FilterGroup>

        <FilterGroup>
          <CustomSelect
            value={localFilters.species}
            options={[
              { value: '', label: 'Any' },
              { value: 'human', label: 'Human' },
              { value: 'alien', label: 'Alien' },
              { value: 'humanoid', label: 'Humanoid' },
              { value: 'robot', label: 'Robot' }
            ]}
            onSelect={handleSpeciesChange}
            placeholder="Species"
          />
        </FilterGroup>
      </FilterRow>

      <FilterRow>
        <FilterGroup>
          <FilterInput
            type="text"
            name="name"
            value={localFilters.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </FilterGroup>

        <FilterGroup>
          <FilterInput
            type="text"
            name="type"
            value={localFilters.type}
            onChange={handleChange}
            placeholder="Type"
          />
        </FilterGroup>

        <ButtonsWrapper>
          <Button type="button" onClick={onApply}>
            Apply
          </Button>
          <Button type="button" $reset onClick={resetFilters}>
            Reset
          </Button>
        </ButtonsWrapper>
      </FilterRow>
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 8px;
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  align-items: flex-end;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FilterInput = styled.input`
  padding: 10px 12px;
  border: 2px solid #72aa43;
  border-radius: 6px;
  font-size: 14px;
  height: 40px;
  background-color: #263750;
  color: #667562;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: inherit;
  color: ${({ $reset }) => ($reset ? '#f44336' : '#4CAF50')};
  border: ${({ $reset }) =>
    $reset ? '1px solid #f44336' : '1px solid #4CAF50'};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.2s;
  height: 40px;
  white-space: nowrap;
  width: 100px;
  @media (max-width: 750px) {
    width: 100%;
  }

  &:hover {
    background-color: ${({ $reset }) => ($reset ? '#d32f2f' : '#45a049')};
    color: white;
  }
`;
