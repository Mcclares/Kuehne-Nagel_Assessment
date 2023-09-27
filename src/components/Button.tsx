
import "./Button.css";

interface TypeButton {
  
    type: "Delete" | "Watching";
    onAct: (orderNo?: string) => void;
    orderNo?: string
}



export default function Button(props: TypeButton) {

    
    return (
        <button id={props.type} onClick={( ) => props.onAct(props.orderNo)} ></button>
    )

}