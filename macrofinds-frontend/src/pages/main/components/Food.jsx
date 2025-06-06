import x from "../assets/x.svg"

export default function Food({food, amount, dietName, remove, setAmount, isOver, draggingElement}){
    const style = {
        animation: isOver && draggingElement === food.id ? "duplicatedFood 2s infinite" : "none"
    }

    return(
        <div className='food dietas-box' style={style}>
            <div className='food-left'>
                <div className='food-left-top'> {food.name} </div>
                <div className='food-left-bot'>
                <input id={dietName + "-" + food.id} type="number" className='dietas-box food-left-bot-input' value={amount} onChange={(e) => setAmount(dietName, food.id, e.target.value)} /> {food.unit}
                </div>
            </div>
            <div className='food-right-remove clickable' onClick={() => remove(dietName, food.id)}>
                <img src={x} alt="remove"/>
            </div>
        </div>
    )
}