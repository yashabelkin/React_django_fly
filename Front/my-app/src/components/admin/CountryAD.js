import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectcountry, updCountryAsync, deleteCountryAsync, addCountryAsync, getCountriesAsync } from '../../slicers/countrySlicer'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Input, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



const CountryAD = () => {
    const countries = useSelector(selectcountry)
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [countryName, setCountryName] = useState("");

    useEffect(() => {
        dispatch(getCountriesAsync())
    }, [])
    return (
        <div>
            <div className='header'>
                <h1>Admin - countries</h1>
            </div>
        <div>

      
      <Table className='table' style={{ width: "70%" }}>
        <TableHead style={{background:'grey', height: "4rem"}}>
          <TableRow>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">id</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">name</TableCell>
            <TableCell style={{ fontSize: "20px", color:'white'}}align="center">Update country</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {
          countries.map((country, ind) => (
            <TableRow key={ind}>
              <TableCell align="center">
                <p style={{ fontSize: "13px", margin: "5px" }}>{country.id}</p>
              </TableCell>
              <TableCell align="center">
                <p style={{ fontSize: "20px", margin: "15px" }}>{country.name}</p>
              </TableCell>
              <TableCell align="center">
              <Input onChange={(e) => setName(e.target.value)}></Input>
              <Button variant="outlined" color="inherit" onClick={() => dispatch(updCountryAsync({
                        name: name,
                        id: country.id
                    }))}> Update </Button>
                    <Button onClick={() => dispatch(deleteCountryAsync({id: country.id}))}
                    color='warning' startIcon={<DeleteIcon />}>delete</Button>
              </TableCell>
            </TableRow>
          ))
        }</TableBody>
      </Table>
      </div>
      <div className='country'>
        <div className='countryIn'>
      <h2>add new country</h2>
                <TextField id="outlined-basic" color="warning" label="" variant="outlined" onChange={(e) => setCountryName(e.target.value)}></TextField>
                <Button variant="outlined" onClick={() => dispatch(addCountryAsync({
                    name: countryName
                }))}>Add</Button>
            
                </div>
       </div>
        </div>

    )
}

export default CountryAD