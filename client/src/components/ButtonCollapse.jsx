import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import Activity from '../components/Activities';
import Comment from './Comments';

const ButtonCol = (props) => {
  
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('View all');

  const onEntered = ()  => setStatus('Close');

  const onExited = () => setStatus('View all');

  const toggle = () => setCollapse(!collapse);
  
  return (
    <div id="buttonCollapse">
      <Collapse isOpen={collapse} onEntered={onEntered} onExited={onExited}>
        {collapse ? 
          <div>
            <Activity id={props.id} /> 
            <Comment id={props.id} />
          </div>
          : 
          ''
        }
      </Collapse>
      <p className="viewAllBut"onClick={toggle}>{status}</p>

    </div>
  );
}

export default ButtonCol;