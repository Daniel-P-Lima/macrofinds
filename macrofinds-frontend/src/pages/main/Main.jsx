import React, { useState, useEffect } from 'react'
import "./Main.css"
import Section from "./components/Section"
import Navbar from "../../assets/Navbar/Navbar"
import Food from "../main/components/Food"

export default function Main(){
  const [dietInfo, setDietInfo] = useState([]);
  const [foodInfo, setFoodInfo] = useState([]);

  useEffect(() => {
    setDietInfo([{"name": "Dieta 1",
                 "price": "24,00",
                 "food": [[0, "Arroz", "g"], [1, "Frango", "g"], [2, "Batata palha", "g"], [3, "Suco de laranja", "ml"]]
                 },
                 {"name": "Dieta 2",
                  "price": "5,00",
                  "food": [[0, "Arroz", "g"]]
                 }])
  }, []);
  
  useEffect(() => {
    setFoodInfo([[0, "Arroz", "g"], [1, "Frango", "g"], [2, "Batata palha", "g"], [3, "Suco de laranja", "ml"]])
  }, []);

  return (
    <div className='dieta-main'>
      <div className='column left-column'>
        <Navbar />
      </div>

      <div className='column mid-column'>
        <div className='dietas-box'>
          <div className='header'>
            <b> Dietas </b>
          </div>
          <div>
            {dietInfo.map((dieta) =>
              <Section info={dieta}/>
            )}
          </div>
        </div>
      </div>

      <div className='column right-column'>
        <div className='dietas-box'>
          <div className='header'>
            <b> Alimentos </b>
          </div>
          <div className='right-column-content'>
            {foodInfo.map((food) => 
              <Food id={food[0]} name={food[1]} unit={food[2]}/>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
