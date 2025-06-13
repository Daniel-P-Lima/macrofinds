import grip from "../assets/grip-vertical.svg"
import { useDraggable } from "@dnd-kit/core"

export default function DraggableFood({food, setFoodPrice}){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: food.id,
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined

    return(
        <div className='food dietas-box clickable' ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className='food-left'>
                <p className="food-left-top">{food.name}</p>
                <div className='food-left-bot'>
                    R$/g &nbsp; <input id={food.id} type="number" className='dietas-box food-left-bot-input' value={food.price} onChange={(e) => setFoodPrice(food.id, e.target.value)} onPointerDown={(e) => e.stopPropagation()} />
                </div>
            </div>
            <div className='food-right'>
                <img src={grip} alt="grip"/>
            </div>
        </div>
    )
}