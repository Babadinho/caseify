import React from 'react';

const Content = () => {
  return (
    <div>
      <h1>
        <img src='./images/icon16.png' alt='caseify icon' /> Caseify
      </h1>
      <p>
        To use Caseify, simply select the text you want to modify, right-click,
        and choose the desired option from the context menu.
      </p>
      <p>
        For more information and support, please visit the{' '}
        <a
          href='https://github.com/Babadinho/caseify'
          target='_blank'
          rel='noopener noreferrer'
        >
          Caseify GitHub page
        </a>
        .
      </p>
      <hr />
    </div>
  );
};

export default Content;
