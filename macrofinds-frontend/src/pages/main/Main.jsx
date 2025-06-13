import React, { useState, useEffect } from 'react'
import "./Main.css"
import Section from "./components/Section"
import Navbar from "../../assets/Navbar/Navbar"
import DraggableFood from "./components/DraggableFood"
import { DndContext } from "@dnd-kit/core"
import { MenuItem, FormControl, Select, Box } from '@mui/material';
import save from "./assets/diskette.svg"
import check from "./assets/check.png"

export default function Main(){
  const [dietInfo, setDietInfo] = useState([]);
  const [foodInfo, setFoodInfo] = useState([]);
  const [draggingElement, setDraggingElement] = useState(null);
  const [selectedDiet, setSelectedDiet] = useState(0);
  const [userData, setUserData] = useState({});
  const [neededConsumption, setNeededConsumption] = useState([]);
  const [checkIconStyle, setcheckIconStyle] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/dietas")
      .then(res => res.json())
      .then(data => {setDietInfo(data)}).then(console.log(dietInfo))
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:5000/foods")
      .then(res => res.json())
      .then(data => {setFoodInfo(data)})
    /*setFoodInfo([{id: 1, name: "Arroz Branco", unit: "g", price: 0.005, cal: 3.59, prot: 0.06, carb: 0.798},
                 {id: 2, name: "Frango", unit: "g", price: 0.011, cal: 2.39, prot: 0.27, carb: 0},
                 {id: 3, name: "Batata palha", unit: "g", price: 0.1, cal: 0.73, prot: 0.018, carb: 0.16},
                 {id: 4, name: "Suco de laranja", unit: "ml", price: 0.024, cal: 0.47, prot: 0.007, carb: 0.103}])*/
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/usuario/1')
      .then(res => res.json())
      .then(data => {
        setUserData({
          peso: data.peso || '',
          altura: data.altura || '',
          sexo: data.sexo || '',
          intensidade: data.intensidade || '',
          idade: data.idade || '',
          tmb_usuario: data.tmb || '',
          objetivo: data.objetivo || ''
        })});
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
                        amount: parseInt(newAmount)
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

  function setFoodPrice(foodId, newPrice){
    console.log(foodInfo)
    setFoodInfo(() => 
      foodInfo.map(food => 
        food.id === foodId
        ? {
          ...food,
          price: parseFloat(newPrice)
        } : food
      )
    )
  }

  function saveDiet(){
    const data = dietInfo.map(diet => ({
      ...diet,
      userId: 1,
      objective: "M" 
    }));

    fetch("http://localhost:5000/dietas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    
    fetch("http://localhost:5000/foods", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodInfo)
    })
  }

  function addRef(){
    setDietInfo(() => 
      dietInfo.map((diet, i) => 
      i === selectedDiet
      ? {
        ...diet,
        plates: [...diet.plates, {name: "Refeição " + (diet.plates.length + 1), food: []}]
      } : diet
    ))

    console.log(dietInfo)
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

                <div className='save-icon-container' onClick={() => {saveDiet(); setcheckIconStyle({animation: "savedDiet 2s"})}}>
                  <img src={save} className="save-icon" alt='save'></img>
                  <img src={check} className="check-icon" style={checkIconStyle} onAnimationEnd={() => {setcheckIconStyle({})}} alt='check' ></img>
                </div>
              </div>

              {dietInfo.length > 0 && <div className='dietas-box-header-mid'>
                <div className='value-box dietas-box' style={{backgroundColor: colorByPercentage(dietInfo[selectedDiet].plates.reduce((a, v) => a += v.food.reduce((a, v) => a += foodInfo.find(f => f.id === v.id).cal * v.amount, 0), 0), neededConsumption[0])}}> Calorias </div>
                <div className='value-box dietas-box' style={{backgroundColor: colorByPercentage(dietInfo[selectedDiet].plates.reduce((a, v) => a += v.food.reduce((a, v) => a += foodInfo.find(f => f.id === v.id).carb * v.amount, 0), 0), neededConsumption[1])}}> Carboidratos </div>
                <div className='value-box dietas-box' style={{backgroundColor: colorByPercentage(dietInfo[selectedDiet].plates.reduce((a, v) => a += v.food.reduce((a, v) => a += foodInfo.find(f => f.id === v.id).prot * v.amount, 0), 0), neededConsumption[2])}}> Proteínas </div>
              </div>}
              
              <div className='dietas-box-header-right'>
                {dietInfo.length > 0 && "R$" + parseFloat(dietInfo[selectedDiet].plates.reduce((a, v) => a += v.food.reduce((a, v) => a += foodInfo.find(f => f.id === v.id).price * v.amount, 0), 0)).toFixed(2).replace(".", ",")}
              </div>
            </header>
            <div>
              {dietInfo.length > 0 && dietInfo[selectedDiet].plates.map((ref) =>
                <Section ref={ref} foodInfo={foodInfo} remove={removeFoodFromDiet} setAmount={setFoodAmount} draggingElement={draggingElement} />
              )}
              <div className='section dietas-box add-ref-button' onClick={() => {addRef()}}> + </div>
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
                <DraggableFood food={food} setFoodPrice={setFoodPrice} />
              )}
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  )
}
