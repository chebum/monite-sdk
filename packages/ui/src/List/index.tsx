import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey2};

  > * + * {
    border-top: 1px solid ${({ theme }) => theme.colors.lightGrey2};
  }
`;

type ListProps = {
  children: React.ReactNode;
  className?: string;
};

const List = ({ className, children }: ListProps) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default List;
