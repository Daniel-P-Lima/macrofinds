import React, { useState, useEffect } from 'react'
import "./Main.css"
import Section from "./components/Section"
import Navbar from "../../assets/Navbar/Navbar"
import DraggableFood from "./components/DraggableFood"
import { DndContext } from "@dnd-kit/core"

export default function Main(){
  const [dietInfo, setDietInfo] = useState([]);
  const [foodInfo, setFoodInfo] = useState([]);

  useEffect(() => {
    setDietInfo([{name: "Dieta 1",
                  price: "24,00",
                  food: [0, 1, 2, 3]
                 },
                 {name: "Dieta 2",
                  price: "5,00",
                  food: [1]
                 }])
  }, []);
  
  useEffect(() => {
    setFoodInfo([{id: 0, name: "Arroz", unit: "g"},
                 {id: 1, name: "Frango", unit: "g"},
                 {id: 2, name: "Batata palha", unit: "g"},
                 {id: 3, name: "Suco de laranja", unit: "ml"}])
  }, []);

  function handleDragEnd(event){
    const {active, over} = event

    if(!over) return

    const overName = over.id
    const newFood = active.id

    setDietInfo(() =>
      dietInfo.map((diet) => 
        diet.name === overName && diet.food.length < 9 && !diet.food.includes(newFood)
          ? {
              ...diet,
              food: [...diet.food, newFood]
            }
          : diet
      )
    )
  }

  function removeFoodFromDiet(dietName, foodId){
    setDietInfo(() =>
      dietInfo.map((diet) => 
        diet.name === dietName
          ? {
              ...diet,
              food: diet.food.filter(id => id !== foodId)
            }
          : diet
      )
    )
  }

  return (
    <div className='dieta-main'>
      <div className='column left-column'>
        <Navbar />
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className='column mid-column'>
          <div className='dietas-box'>
            <header className='header'>
              <h5><strong> Dietas </strong></h5>
            </header>
            <div>
              {dietInfo.map((dieta) =>
                <Section dieta={dieta} foodInfo={foodInfo} remove={removeFoodFromDiet} />
              )}
            </div>
          </div>
        </div>

        <div className='column right-column'>
          <div className='dietas-box'>
            <header className='header'>
              <h5><strong> Alimentos </strong></h5>
            </header>
            <div className='right-column-content'>
              {foodInfo.map((food) =>
                <DraggableFood food={food}/>
              )}
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  )
}
