import { useDroppable } from "@dnd-kit/core"
import Food from "./Food"

export default function Content({foodInfo, contentClass}){
    const {isOver, setNodeRef} = useDroppable({
        id: contentClass
    })

    const style = {
        color: isOver ? "green" : undefined
    }

    return(
        <div className={contentClass} ref={setNodeRef} style={style}>
            {foodInfo.map((food) => 
                <Food id={food[0]} name={food[1]} unit={food[2]}/>
            )}
        </div>
    )
}