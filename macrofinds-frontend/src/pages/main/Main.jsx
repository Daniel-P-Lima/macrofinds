import React, { useState, useEffect } from 'react'
import "./Main.css"
import Section from "./components/Section"
import Navbar from "../../assets/Navbar/Navbar"
import DraggableFood from "./components/DraggableFood"
import { DndContext } from "@dnd-kit/core"

export default function Main(){
  const [dietInfo, setDietInfo] = useState([]);
  const [foodInfo, setFoodInfo] = useState([]);
  const [draggingElement, setDraggingElement] = useState(null);

  useEffect(() => {
    setDietInfo([{name: "Dieta 1",
                  price: "24,00",
                  food: [{id: 0, amount: 150}, {id: 1, amount: 100}, {id: 2, amount: 30}, {id: 3, amount: 200}]
                 },
                 {name: "Dieta 2",
                  price: "5,00",
                  food: [{id: 1, amount: 150}]
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
    const newFood = {id: active.id, amount: 0}

    setDietInfo(() =>
      dietInfo.map((diet) => 
        diet.name === overName && diet.food.length < 9 && !diet.food.some((food) => food.id === newFood.id)
          ? {
              ...diet,
              food: [...diet.food, newFood]
            }
          : diet
      )
    )

    setDraggingElement(null)
  }

  function handleDragOver(event){
    const {active, over} = event

    setDraggingElement(null)

    if(!over) return

    setDraggingElement(active.id)
  }

  function removeFoodFromDiet(dietName, foodId){
    setDietInfo(() =>
      dietInfo.map((diet) => 
        diet.name === dietName
          ? {
              ...diet,
              food: diet.food.filter(food => food.id !== foodId)
            }
          : diet
      )
    )
  }

  function setFoodAmount(dietName, foodId, newAmount){
    setDietInfo(() =>
      dietInfo.map((diet) => 
        diet.name === dietName
          ? {
              ...diet,
              food: diet.food.map(food =>
                food.id === foodId
                ? {
                    ...food,
                    amount: newAmount
                  }
                : food
              )
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

      <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <div className='column mid-column'>
          <div className='dietas-box'>
            <header className='dietas-box-header'>
              <strong> Dietas </strong>
            </header>
            <div>
              {dietInfo.map((dieta) =>
                <Section dieta={dieta} foodInfo={foodInfo} remove={removeFoodFromDiet} setAmount={setFoodAmount} draggingElement={draggingElement} />
              )}
            </div>
          </div>
        </div>

        <div className='column right-column'>
          <div className='dietas-box'>
            <header className='dietas-box-header'>
              <strong> Alimentos </strong>
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
