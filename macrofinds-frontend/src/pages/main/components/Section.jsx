import Content from "./Content"

export default function Section({dieta, foodInfo, remove}){
    return(
        <div className='section dietas-box'>
            <div className='left-section'>
                <div className='left-section-row'> {dieta.name} </div>
                <div className='left-section-row'> R$ {dieta.price} </div>
                <div className='left-section-values'>
                <div className='value-box dietas-box'>
                    <div className='value-box-circle'></div> Calorias
                </div>
                <div className='value-box dietas-box'>
                    <div className='value-box-circle'></div> Carboidratos
                </div>
                <div className='value-box dietas-box'>
                    <div className='value-box-circle'></div> Proteínas
                </div>
                </div>
            </div>
            <Content name={dieta.name} dietFoodList={dieta.food} foodInfo={foodInfo} remove={remove} />
        </div>
    )
}