import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div className ='footer'>

        <div className='socialMedia'>
            <InstagramIcon/><FacebookIcon/><EmailIcon/><LinkedInIcon/>
            
        </div>
        <p> &copy; 2022 SkyFly.com </p>
        
        
        </div>
  )
}

export default Footer