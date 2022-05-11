import React from 'react';
import { AccordionItemContent } from '../index';
import * as S from './AccordionItem.styles';

const AccordionItem = ({ data, toggle, clicked }) => {
  const { id, title, about } = data;
  const isClicked = clicked === id;

  return (
    <>
      <S.Wrap onClick={() => toggle(id)}>
        <S.Element>{id}</S.Element>
        <h2>{title}</h2>
        <S.BorderLine active={isClicked} />
      </S.Wrap>
      {isClicked && <AccordionItemContent data={about} />}
    </>
  );
};

export default AccordionItem;