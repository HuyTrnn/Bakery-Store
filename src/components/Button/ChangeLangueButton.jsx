import { Flex, Select } from 'antd'
import React from 'react'
import { FaCircle, FaLanguage, FaStar } from 'react-icons/fa'
import { TfiViewList } from 'react-icons/tfi'
import { useDispatch } from 'react-redux'
import { setLanguage } from '~/store/slices/languageSlice'
import './ChangeLangueButton.scss'
export default function ChangeLangueButton() {
  const dispatch = useDispatch()
  const onChange = (value) => {
    dispatch(setLanguage(value))
  }

  return (
    <Select
    showSearch
    placeholder={<FaLanguage />}
    optionFilterProp="label"
    onChange={onChange}
    // suffixIcon={<FaLanguage />}
    options={[
      {
        value: 'vi',
        label: <Flex align="center" gap={4}><FaStar /> Vietnamese</Flex>,
      },
      {
        value: 'en',
        label: <Flex align="center" gap={4}><TfiViewList /> English</Flex>,
      },
      {
        value: 'ja',
        label: <Flex align="center" gap={4}><FaCircle /> Japanese</Flex>,
      },
    ]}
  />
  )
}
