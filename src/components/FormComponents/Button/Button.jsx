import './Button.scss'

const Button = props => {
    return (

        // Render enabled or disabled button based on props.enabled.
        (props.enabled) ? 
            <button onClick={ props.clickme }>{props.title}</button> 
            : 
            <button onClick={ props.clickme } disabled>{props.title}</button>
        
    )
}

export default Button