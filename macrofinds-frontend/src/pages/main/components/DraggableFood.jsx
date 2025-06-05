import grip from "../assets/grip-vertical.svg"
import { useDraggable } from "@dnd-kit/core"

export default function DraggableFood({food}){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: food.id,
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined

    return(
        <div className='food dietas-box clickable' ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className='food-left'>
                <div className='food-left-top'> {food.name} </div>
                <div className='food-left-bot'>
                <input id={food.id} type="text" className='dietas-box'/> {food.unit}
                </div>
            </div>
            <div className='food-right'>
                <img src={grip} alt="grip"/>
            </div>
        </div>
    )
}