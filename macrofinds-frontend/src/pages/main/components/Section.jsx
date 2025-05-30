import Food from "./Food"

export default function Section({info}){
    return(
        <div className='section dietas-box'>
            <div className='left-section'>
                <div className='left-section-row'> {info.name} </div>
                <div className='left-section-row'> R$ {info.price} </div>
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
            <div className='right-section'>
                {info.food.map((food) => 
                    <Food id={food[0]} name={food[1]} unit={food[2]} />
                )}
            </div>
        </div>
    )
}