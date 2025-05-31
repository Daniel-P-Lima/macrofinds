import React, { useState, useEffect } from 'react'
import "./Main.css"
import Section from "./components/Section"
import Navbar from "../../assets/Navbar/Navbar"
import Content from "./components/Content"
import { DndContext } from "@dnd-kit/core"

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
                  "food": [[8, "Arroz", "g"]]
                 }])
  }, []);
  
  useEffect(() => {
    setFoodInfo([[4, "Arroz", "g"], [5, "Frango", "g"], [6, "Batata palha", "g"], [7, "Suco de laranja", "ml"]])
  }, []);

  return (
    <div className='dieta-main'>
      <div className='column left-column'>
        <Navbar />
      </div>

      <DndContext>
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
            <Content foodInfo={foodInfo} contentClass={'right-column-content'} />
          </div>
        </div>
      </DndContext>
    </div>
  )
}
