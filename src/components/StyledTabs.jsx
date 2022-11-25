import React from 'react'
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



export const STabs = styled((props) => (
    <Tabs
      {...props} 
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'none',
      
    }
  });
  
  export const STab = styled((props) => <Tab  {...props} />)(
    ({ theme }) => ({
      textTransform: 'capitalize',
      fontSize: theme.typography.pxToRem(12),
      fontWeight: 'medium',
      maxHeight:10,
      fontFamily:'Nunito',
      color: '#203990',
      padding: 0,
      margin:0,
      borderRadius:'50px',
      '&.Mui-selected': {
        color: '#fff',
        backgroundColor:'#203990'
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#203990',
      },
    }),
);
  
const StyledTabs = () => {
  return null
}

export default StyledTabs