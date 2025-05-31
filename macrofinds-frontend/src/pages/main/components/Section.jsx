import Content from "./Content"

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
            <Content foodInfo={info.food} contentClass={'right-section'} />
        </div>
    )
}