import { Button, Input, AutoComplete, Menu, Popover } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { Data } from '../constants';
import css from '../runtime.less';

export default function LeftContent({ data }: RuntimeParams<Data>) {
  const [options, setOptions] = useState([]);

  function getRandomInt(max: number, min: number = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
  }

  const searchResult = (query: string) =>
    new Array(getRandomInt(5))
      .join('.')
      .split('.')
      .map((_, idx) => {
        const category = `${query}${idx}`;
        return {
          value: category,
          label: (
            <a
              href={`https://k.com?q=${query}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {category}
            </a>
          ),
        };
      });

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };
  
  return (
    <>
      <AutoComplete  placeholder='请输入服务名称'  options={options} onSearch={handleSearch}>
      </AutoComplete>

    </>
  );
}