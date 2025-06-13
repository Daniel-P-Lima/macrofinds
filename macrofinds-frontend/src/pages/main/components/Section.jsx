import { useDroppable } from "@dnd-kit/core"
import Food from "./Food"

export default function Section({ref, foodInfo, remove, setAmount, draggingElement}){
    const {isOver, setNodeRef} = useDroppable({
        id: ref.name
    })

    const style = {
        display: isOver && ref.food.length < 9 && !ref.food.some(food => food.id === draggingElement) ? "block" : "none"
    }

    return(
        <div className='section dietas-box'>
            <div className='left-section'>
                <strong> {ref.name} </strong>
                <p className='no-margin'> R$ {parseFloat(ref.food.reduce((a, v) => a += foodInfo.find(f => f.id === v.id).price * v.amount, 0)).toFixed(2).replace(".", ",")} </p>
                <div className='left-section-values'>
                
                </div>
            </div>
            <div className='right-section' ref={setNodeRef}>
                {ref.food.map((food) => 
                    <Food amount={food.amount} food={foodInfo.find(f => f.id === food.id)} remove={remove} dietName={ref.name} setAmount={setAmount} isOver={isOver} draggingElement={draggingElement} />
                )}
                <div className="lastFood" style={style}></div>
            </div>
        </div>
    )
}