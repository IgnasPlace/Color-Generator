import {RxCross1} from 'react-icons/rx';

const RemoveButton = ({onClick, color}) => {
  return (
    <div className='control-button' style={{ color: color }} onClick={onClick}>
        <RxCross1 />
    </div>
  )
}

export default RemoveButton;