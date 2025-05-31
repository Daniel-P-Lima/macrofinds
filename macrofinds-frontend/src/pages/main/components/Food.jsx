import grip from "../assets/grip-vertical.svg"
import { useDraggable } from "@dnd-kit/core"

export default function Food({name, unit, id}){
    const {attributes, listeners, setNodeRed, transform} = useDraggable({
        id: id
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined

    return(
        <div className='food dietas-box' ref={setNodeRed} style={style} {...listeners} {...attributes}>
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