import React from 'react';

interface HcYeaNayStringProperties {
  status: boolean | undefined | null;
  yeaString?: string;
  nayString?: string;
}

const HcYeaNayString: React.FC<HcYeaNayStringProperties> = ({
  status,
  yeaString = 'Yes',
  nayString = 'No',
}) => {
  return (
    <span className={`hc-yeanay ${status ? 'yea' : 'nay'}`}>
      {status ? yeaString : nayString}
    </span>
  );
};

export default HcYeaNayString;
