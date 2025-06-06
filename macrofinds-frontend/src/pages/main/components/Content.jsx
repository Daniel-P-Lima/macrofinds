import { useDroppable } from "@dnd-kit/core"
import Food from "./Food"

export default function Content({name, dietFoodList, foodInfo, remove, setAmount, draggingElement}){
    const {isOver, setNodeRef} = useDroppable({
        id: name
    })

    const style = {
        display: isOver && dietFoodList.length < 9 && !dietFoodList.some(food => food.id === draggingElement) ? "block" : "none"
    }

    return(
        <div className='right-section' ref={setNodeRef}>
            {dietFoodList.map((food) => 
                <Food amount={food.amount} food={foodInfo[food.id]} remove={remove} dietName={name} setAmount={setAmount} isOver={isOver} draggingElement={draggingElement} />
            )}
            <div className="lastFood" style={style}></div>
        </div>
    )
}