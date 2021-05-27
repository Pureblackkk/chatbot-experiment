import './index.css';

export default function NextButton(props) {

    const sendClick = () => {
        props.clickCallback();
    }

    return (
        <div style={{color: props.color}}>
               <div style={{display: props.isShow ? 'block' : 'none'}} 
               className='next-btn' onClick={sendClick}></div>
        </div>
    )
}