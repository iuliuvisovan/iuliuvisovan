import React from 'react'
import { Label, vw } from '../global'

export default (props) => (
  <Label weight={500} style={{ padding: 15, color: '#7c878e', paddingBottom: 15, paddingTop: 25, backgroundColor: '#131e2a', width: vw }}>
    {props.text.toUpperCase()}
  </Label>
)