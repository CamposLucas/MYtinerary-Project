import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import Activity from '../components/Activities';

const ButtonCol = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('View all');

  const onEntered = ()  => setStatus('Close');

  const onExited = () => setStatus('View all');

  const toggle = () => setCollapse(!collapse);
  
  return (
    <div id="buttonCollapse">
      <Collapse isOpen={collapse} onEntered={onEntered} onExited={onExited}>
        {collapse ? <Activity id={props.id} /> : ''}
      </Collapse>
      <p className="viewAllBut"onClick={toggle}>{status}</p>

    </div>
  );
}

export default ButtonCol;