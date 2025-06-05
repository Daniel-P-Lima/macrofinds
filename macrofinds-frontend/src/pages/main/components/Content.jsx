import { useDroppable } from "@dnd-kit/core"
import Food from "./Food"

export default function Content({name, dietFoodList, foodInfo, remove}){
    const {isOver, setNodeRef} = useDroppable({
        id: name
    })

    const style = {
        display: isOver && dietFoodList.length < 9 ? "block" : "none"
    }

    return(
        <div className='right-section' ref={setNodeRef}>
            {dietFoodList.map((foodId) => 
                <Food food={foodInfo[foodId]} remove={remove} dietName={name} />
            )}
            <div className="lastFood" style={style}></div>
        </div>
    )
}