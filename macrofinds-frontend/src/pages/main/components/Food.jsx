import x from "../assets/x.svg"

export default function Food({food, dietName, remove}){
    return(
        <div className='food dietas-box'>
            <div className='food-left'>
                <div className='food-left-top'> {food.name} </div>
                <div className='food-left-bot'>
                <input id="1" type="text" className='dietas-box food-left-bot-input'/> {food.unit}
                </div>
            </div>
            <div className='food-right-remove clickable' onClick={() => remove(dietName, food.id)}>
                <img src={x} alt="remove"/>
            </div>
        </div>
    )
}