import styled from 'styled-components';
import { ReactComponent as Male } from '../../assets/genders/male.svg';
import { ReactComponent as Female } from '../../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../../assets/genders/genderless.svg';

export function CardTitle({ name, gender, className }) {
  const iconProps = { width: 24, height: 24 };
  const icons = {
    Male: <Male {...iconProps} fill="#33b3c8" title="Male" />,
    Female: <Female {...iconProps} fill="pink" title="Female" />,
    unknown: <Genderless {...iconProps} fill="#999" title="Genderless" />,
    Genderless: <Genderless {...iconProps} fill="#999" title="Genderless" />
  };

  return (
    <CardTitleContainer className={className}>
      <StyledCardTitle className="card-title">{name}</StyledCardTitle>
      <IconContainer>{icons[gender]}</IconContainer>
    </CardTitleContainer>
  );
}

const IconContainer = styled.div`
  display: flex;
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledCardTitle = styled.h2`
  margin-right: 8px;
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: 24px;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;
