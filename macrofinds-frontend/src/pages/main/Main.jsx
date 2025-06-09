import React, { useState, useEffect } from 'react'
import "./Main.css"
import Section from "./components/Section"
import Navbar from "../../assets/Navbar/Navbar"
import DraggableFood from "./components/DraggableFood"
import { DndContext } from "@dnd-kit/core"
import { MenuItem, FormControl, Select, Box } from '@mui/material';

export default function Main(){
  const [dietInfo, setDietInfo] = useState([]);
  const [foodInfo, setFoodInfo] = useState([]);
  const [draggingElement, setDraggingElement] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(0);
  const [userData, setUserData] = useState({});
  const [neededConsumption, setNeededConsumption] = useState([]);

  useEffect(() => {
    setDietInfo([{name: "Dieta 1",
                  plates: [{name: "Refeição 1",
                            food: [{id: 0, amount: 150}, {id: 1, amount: 100}, {id: 2, amount: 30}, {id: 3, amount: 200}]
                           },
                           {name: "Refeição 2",
                            food: [{id: 1, amount: 150}]
                           }]
                 },
                 {name: "Dieta 2",
                  plates: [{name: "Refeição 1",
                            food: [{id: 1, amount: 100}]
                           },
                           {name: "Refeição 2",
                            food: [{id: 0, amount: 150}, {id: 1, amount: 100}, {id: 2, amount: 30}, {id: 3, amount: 200}]
                           }]
                 }
                ])
  }, []);
  
  useEffect(() => {
    setFoodInfo([{id: 0, name: "Arroz Branco", unit: "g", price: 0.07, cal: 3590, prot: 0.06, carb: 0.798},
                 {id: 1, name: "Frango", unit: "g", price: 0.1, cal: 2390, prot: 0.27, carb: 0},
                 {id: 2, name: "Batata palha", unit: "g", price: 0.05, cal: 730, prot: 0.018, carb: 0.16},
                 {id: 3, name: "Suco de laranja", unit: "ml", price: 0.05, cal: 470, prot: 0.007, carb: 0.103}])
  }, []);

  useEffect(() => {
    setUserData({
      peso: 54,
      altura: 173,
      sexo: "M",
      intensidade: "M",
      idade: 20,
      objetivo: "M"
    });
    /*fetch('http://localhost:5000/usuario/1')
      .then(res => res.json())
      .then(data => {
        setUserData({
            peso: data.peso_usuario || '',
            altura: data.altura_usuario || '',
            sexo: data.sexo_usuario || '',
            intensidade: data.tipo_atividade_fisica || '',
            idade: data.idade_usuario || '',
            objetivo: data.obj_usuario || ''
        });
      }
    );*/
  }, []);

  useEffect(() => {
    const peso = parseFloat(userData.peso);
    const altura = parseFloat(userData.altura);
    const idade = parseFloat(userData.idade);

    let resultado = 0;
    if (userData.sexo === 'M') {
      resultado = 66 + 13.7 * peso + 5 * altura - 6.8 * idade;
    } else if (userData.sexo === 'F') {
      resultado = 655 + 9.6 * peso + 1.7 * altura - 4.7 * idade;
    }

    let fator = 1;
    if (userData.intensidade === 'N') fator = 1.2;
    else if (userData.intensidade === 'M') fator = 1.35;
    else if (userData.intensidade === 'I') fator = 1.45;

    const tmbFinal = resultado * fator;

    let calcProteinas, calcCarboidratos;
    //prot e carbos calculo de acordo com o objetivo
    if (userData.objetivo === 'B') {
        calcProteinas = peso * 2.2; // 2.2g por kg de peso
        calcCarboidratos = peso * 5; // 5g por kg de peso
    } else if (userData.objetivo === 'C') {
        calcProteinas = peso * 2.5; // 2.5g por kg de peso
        calcCarboidratos = peso * 3; // 3g por kg de peso
    } else if (userData.objetivo === 'M') {
        calcProteinas = peso * 2; // 2g por kg de peso
        calcCarboidratos = peso * 4; // 4g por kg de peso
    }

    setNeededConsumption([tmbFinal, calcCarboidratos, calcProteinas]);
  }, [userData]);

  function colorByPercentage(value, total){
    const percentage = value / total;

    if(percentage >= 1) return "#6fc276"
    else if(percentage >= 0.75) return "#ffee8c"
    else return "#ff746c"
  }

  function handleDragEnd(event){
    const {active, over} = event

    if(!over) return

    const overName = over.id
    const newFood = {id: active.id, amount: 0}

    setDietInfo(() =>
      dietInfo.map((diet, i) => 
        i === selectedDiet
        ? {
            ...diet,
            plates: diet.plates.map((ref) => 
              ref.name === overName && ref.food.length < 9 && !ref.food.some((food) => food.id === newFood.id)
              ? {
                  ...ref,
                  food: [...ref.food, newFood]
                }
              : ref
            )
          } : diet
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

  function removeFoodFromDiet(refName, foodId){
    setDietInfo(() =>
      dietInfo.map((diet, i) =>
        i === selectedDiet
        ? {
            ...diet,
            plates: diet.plates.map((ref) => 
              ref.name === refName
              ? {
                  ...ref,
                  food: ref.food.filter(food => food.id !== foodId)
                }
              : ref
            )
          } : diet
      )
    )
  }

  function setFoodAmount(refName, foodId, newAmount){
    setDietInfo(() =>
      dietInfo.map((diet, i) => 
        i === selectedDiet
        ? {
            ...diet,
            plates: diet.plates.map((ref) => 
              ref.name === refName
              ? {
                  ...ref,
                  food: ref.food.map(food =>
                    food.id === foodId
                    ? {
                        ...food,
                        amount: newAmount
                      }
                    : food
                  )
                }
              : ref
            )
        } : diet
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
              <div className='dietas-box-header-left'>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{
                      minWidth: '200px',
                      width: '20%',
                  }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <FormControl fullWidth margin='none'>
                    {dietInfo.length > 0 && (
                      <Select
                        value={selectedDiet}
                        variant="outlined"
                        onChange={(e) => {setSelectedDiet(parseInt(e.target.value))}}
                        fullWidth
                      >
                        {dietInfo.map((dieta, i) =>
                          <MenuItem value={i}> {dieta.name} </MenuItem>
                        )}
                      </Select>
                    )}
                  </FormControl>
                </Box>
              </div>

              {dietInfo.length > 0 && <div className='dietas-box-header-mid'>
                <div className='value-box dietas-box' style={{backgroundColor: colorByPercentage(dietInfo[selectedDiet].plates.reduce((a, v) => a += v.food.reduce((a, v) => a += foodInfo[v.id].cal * v.amount, 0), 0), neededConsumption[0])}}> Calorias </div>
                <div className='value-box dietas-box' style={{backgroundColor: colorByPercentage(dietInfo[selectedDiet].plates.reduce((a, v) => a += v.food.reduce((a, v) => a += foodInfo[v.id].carb * v.amount, 0), 0), neededConsumption[1])}}> Carboidratos </div>
                <div className='value-box dietas-box' style={{backgroundColor: colorByPercentage(dietInfo[selectedDiet].plates.reduce((a, v) => a += v.food.reduce((a, v) => a += foodInfo[v.id].prot * v.amount, 0), 0), neededConsumption[2])}}> Proteínas </div>
              </div>}
              
              <div className='dietas-box-header-right'>
                {dietInfo.length > 0 && "R$" + parseFloat(dietInfo[selectedDiet].plates.reduce((a, v) => a += v.food.reduce((a, v) => a += foodInfo[v.id].price * v.amount, 0), 0)).toFixed(2).replace(".", ",")}
              </div>
            </header>
            <div>
              {dietInfo.length > 0 && dietInfo[selectedDiet].plates.map((ref) =>
                <Section ref={ref} foodInfo={foodInfo} remove={removeFoodFromDiet} setAmount={setFoodAmount} draggingElement={draggingElement} />
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
