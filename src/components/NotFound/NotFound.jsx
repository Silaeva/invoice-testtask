import React from 'react';
import {Content} from "../Content/Content";

const NotFound = () => {
  return (
    <Content title="Ошибка 404">
      <p style={{textAlign: 'center'}}>Упс… Эта страница затерялась где-то в галактике Интернета</p>
    </Content>
  )
}

export {NotFound};
