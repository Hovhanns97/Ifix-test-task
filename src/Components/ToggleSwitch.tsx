import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 40px;
  height: 18px;
  background: unset;
  border: white 2px solid;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  display: none;

  &:checked + ${Switch} {
    background: green;

    &:before {
      transform: translate(22px, -50%);
    }
  }
`;

const Span = styled.span`
  font-size: 18px;
  color: ${({ color }) => (color && color) || 'white'};
`;

const ToggleSwitch = ({
  title,
  color,
  checked,
  onClick,
}: {
  title: string;
  color: string;
  checked: boolean;
  onClick: Function;
}) => {
  return (
    <Label>
      <Input
        type='checkbox'
        checked={checked}
        onClick={(e) => onClick(e, title)}
      />
      <Switch />
      <Span color={color}>{title}</Span>
    </Label>
  );
};

export default ToggleSwitch;
