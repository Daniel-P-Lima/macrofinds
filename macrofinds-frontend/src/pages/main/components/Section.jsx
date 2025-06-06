import Content from "./Content"

export default function Section({dieta, foodInfo, remove, setAmount, draggingElement}){
    return(
        <div className='section dietas-box'>
            <div className='left-section'>
                <h6 className='no-margin'><strong> {dieta.name} </strong></h6>
                <p className='no-margin'> R$ {dieta.price} </p>
                <div className='left-section-values'>
                <div className='value-box dietas-box'>
                    <div className='value-box-circle'></div> <p className="no-margin">Calorias</p>
                </div>
                <div className='value-box dietas-box'>
                    <div className='value-box-circle'></div> <p className="no-margin">Carboidratos</p>
                </div>
                <div className='value-box dietas-box'>
                    <div className='value-box-circle'></div> <p className="no-margin">Proteínas</p>
                </div>
                </div>
            </div>
            <Content name={dieta.name} dietFoodList={dieta.food} foodInfo={foodInfo} remove={remove} setAmount={setAmount} draggingElement={draggingElement} />
        </div>
    )
}