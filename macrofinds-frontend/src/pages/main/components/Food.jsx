import grip from "../assets/grip-vertical.svg"

export default function Food({name, unit, id}){
    return(
        <div className='food dietas-box'>
            <div className='food-left'>
                <div className='food-left-top'> {name} </div>
                <div className='food-left-bot'>
                <input id={id} type="text" className='dietas-box'/> {unit}
                </div>
            </div>
            <div className='food-right'>
                <img src={grip} alt="grip"/>
            </div>
        </div>
    )
}