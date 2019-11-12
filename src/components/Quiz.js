import React from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import '../App.css';

const Quiz = (props) => {
	const [selectedValue, setSelectedValue] = React.useState('');

  	const handleSelected = (event) => {
    	setSelectedValue(event.target.value);
	};

	return (
		<div id="quiz-container">			
			<br/>
			<div id="multiple-choices">
				<span className="check-label">A.</span> <Radio name="radios" checked={selectedValue === 'a'} onChange={props.handleChecked} value="a" inputProps={{ 'aria-label': 'A' }} onClick={handleSelected}/>
      			<span className="check-label">B.</span> <Radio name="radios" checked={selectedValue === 'b'} onChange={props.handleChecked} value="b" inputProps={{ 'aria-label': 'B' }} onClick={handleSelected}/>
      			<span className="check-label">C.</span> <Radio name="radios" checked={selectedValue === 'c'} onChange={props.handleChecked} value="c" inputProps={{ 'aria-label': 'C' }} onClick={handleSelected}/>
      			<span className="check-label">D.</span> <Radio name="radios" checked={selectedValue === 'd'} onChange={props.handleChecked} value="d" inputProps={{ 'aria-label': 'D' }} onClick={handleSelected}/>
			</div>
			<br/>
			 <Button variant="outlined" size="large" className="submit-btn" onClick={props.handleClick}>
          submit
        </Button>
		</div>
	)
}

export default Quiz;