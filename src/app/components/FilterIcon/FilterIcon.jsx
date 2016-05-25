import React from 'react';

const FilterIcon = ({ className, width, height, fill }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width={width} height={height} fill={fill} viewBox="0 0 32 32">
    <title>filter.v3</title>
    <g>
      <circle cx="13.0944" cy="7.375" r="1.3192" />
      <circle cx="19.6222" cy="6.375" r="1.3189" />
      <circle cx="15.9997" cy="10.5242" r="1.3193" />
      <g>
        <path
          d={'M14.1785,27.562a0.95,0.95,0,0,1-.95-0.95v-10.27L6.6875,9.2893a0.95,0.95,0,0,1,' +
            '1.3956-1.29l7.0455,7.598v11.015A0.95,0.95,0,0,1,14.1785,27.562Z'}
        />
        <path
          d={'M18.0387,24.794a0.95,0.95,0,0,1-.95-0.95V15.603l7.126-7.8149a0.95,0.95,0,0,1,1.41,' +
            '1.2744l-6.636,7.2729v7.5083A0.95,0.95,0,0,1,18.0387,24.794Z'}
        />
      </g>
    </g>
  </svg>
);

// const FilterIcon = ({ id, className }) => (
//   <span id={id} className={className}>
//     {icon}
//   </span>
// );

FilterIcon.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default FilterIcon;
