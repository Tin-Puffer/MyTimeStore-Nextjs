import React from 'react';
// @ts-ignore
import { Comments } from 'react-facebook-sdk';

const FacebookComment = ({ url }:{url:string}) => {
  return (
    <div>
      <Comments href={url} />
    </div>
  );
};

export default FacebookComment;