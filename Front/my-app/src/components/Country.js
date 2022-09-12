import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectcountry, updCountryAsync, deleteCountryAsync, addCountryAsync, getCountriesAsync } from '../slicers/countrySlicer'
import CardGroup from 'react-bootstrap/CardGroup';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Countries = () => {
    const countries = useSelector(selectcountry)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountriesAsync())
    }, [])

    return (
        <div className='container'>
            <div className='header'>
            <h1>Popular Destanations</h1>
            </div>
            <div className='row align:center;' >
                <div className='col-md-4'>
                    <div className='popcard'>
                        <div className='pop-image'>
                            <img src={require(`../assets/Gree.png`)} alt='pic' />
                        </div>
                        <div className='pop-title'>
                        <h4>Greece</h4>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='popcard'>
                        <div className='pop-image'>
                            <img src={require(`../assets/Israel.png`)} alt='pic' />
                        </div>
                        <div className='pop-title'>
                            <h4>Israel</h4>
                            
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='popcard'>
                        <div className='pop-image'>
                            <img src={require(`../assets/Ita.png`)} alt='pic' />
                        </div>
                        <div className='pop-title'>
                        <h4>Italy</h4>
                            
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='popcard'>
                        <div className='pop-image'>
                            <img src={require(`../assets/Jap.png`)} alt='pic' />
                        </div>
                        <div className='pop-title'>
                        <h4>Japan</h4>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='popcard'>
                        <div className='pop-image'>
                            <img src={require(`../assets/Fra.png`)} alt='pic' />
                        </div>
                        <div className='pop-title'>
                            <h4>France</h4>
                            
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='popcard'>
                        <div className='pop-image'>
                            <img src={require(`../assets/Turk.png`)} alt='pic' />
                        </div>
                        <div className='pop-title'>
                        <h4>Turkey</h4>
                        <div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
            <div className='header'>
                <h1>
                <Button variant='contained' as={Link} to={"/"}>Search Your Next Vocation <SearchIcon></SearchIcon></Button>
                </h1>
                <br></br>
            </div>
        </div>


    )
}


{/* {countries.map((country, ind) => <div key={ind}>
    <Card className="card">
      <Card.Img className='card-img'
      src={require(`../assets/${country.name}.png`)} alt="Card image" />
      <Card.ImgOverlay>
      <div className='card-title'>{country.name}</div>
      <div className='card-bottom'></div>
      </Card.ImgOverlay>
      
    </Card>  */}
{/* </div>)}  */ }

export default Countries
















