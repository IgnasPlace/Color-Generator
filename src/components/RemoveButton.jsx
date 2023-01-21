import {RxCross1} from 'react-icons/rx';

const RemoveButton = (props) => {
  return (
    <div className='control-button' onClick={props.onClick}>
        <RxCross1 />
    </div>
  )
}

export default RemoveButton;