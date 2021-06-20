import './index.css';

export default function NextButton(props) {

    const sendClick = () => {
        props.clickCallback();
    }

    return (
        <div>
               <div style={{display: props.isShow ? 'block' : 'none', backgroundColor: props.color}} 
               className='skip-btn' onClick={sendClick}>
                   Task is Done, Skip this Section
               </div>
        </div>
    )
}