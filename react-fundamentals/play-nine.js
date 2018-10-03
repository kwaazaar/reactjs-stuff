const Stars = (props) => {
	return (
  	<div className="col-5">
    	{_.range(props.numberOfStars).map((i) => 
      	<i key={i} className="fa fa-star"></i>
      )}
		</div>
  );
}

const Button = (props) => {
	let button;
  switch (props.lastAnswerIsCorrect) {
  	case true:
    	button = 
      	<button onClick={props.acceptAnswer} className="btn btn-success">
      		<i className="fa fa-check" />
      	</button>;
			break;
		case false:
    	button =
      	<button className="btn btn-danger">
      		<i className="fa fa-times" />
      	</button>;
 			break;
		default:
			button =
        <button onClick={props.checkAnswer} className="btn" disabled={props.selectedNumbers.length === 0}>
        =
        </button>;
			break;
  }
	return (
  	<div className="col-2">
    	{button}
      <br/><br/>
      <button disabled={props.redraws === 0} onClick={props.redraw} className="btn btn-warning"><i className="fa fa-redo" /> {props.redraws}</button>
		</div>
  );
}

const Numbers = (props) => {
	const numberClassName = (n) => {
  	if (props.selectedNumbers.indexOf(n) >= 0) {return "selected"}
    if (props.usedNumbers.indexOf(n) >= 0) {return "used"}
  	return null;
  }
	return props.endMessage ? (
  		<div className="text-center">
      	<h3>{props.endMessage}</h3>
  			<button onClick={props.restartGame}>Start again</button>
     	</div>
    ) : (
      <div className="card text-center">
        <div>
          {Numbers.list.map((n, i) =>
              <span onClick={() => props.selectNumber(n)} key={i} className={numberClassName(n)}>{n}</span>
          )}
        </div>
      </div>
    );
}

Numbers.list = _.range(1,10);

const Answer = (props) => {
	return (
  	<div className="col-5">
    	<div>
      	{props.selectedNumbers.map((n, i) =>
          	<span onClick={() => props.selectNumber(n)} key={i}>{n}</span>
        )}
    	</div>
		</div>
  );
}

class Game extends React.Component {
	static pickNumberOfStars = () => 1 + Math.floor(Math.random() * 9);
  
	getInitialState = () => ({
  	selectedNumbers: [],
    numberOfStars: Game.pickNumberOfStars(),
    lastAnswerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    endMessage: null,
  });
  
  state = this.getInitialState();
  
  selectNumber = (n) => {
  	if (this.state.selectedNumbers.indexOf(n) >= 0) {return;}
    this.state.lastAnswerIsCorrect = null;
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.concat(n)
    }));
  }
  
  redraw = () => {
  	if (this.state.redraws === 0) { return; }
    
  	this.setState((prevState) => ({
    	lastAnswerIsCorrect: null,
      selectedNumbers: [],
      numberOfStars: Game.pickNumberOfStars(),
      lastAnswerIsCorrect: null,
      redraws: --prevState.redraws,
    }), () => this.determineGameState());
  }
  
  deSelectNumber = (n) => {
  	const i = this.state.selectedNumbers.indexOf(n);
  	if (i < 0) {return;}
    
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.filter(nArr => nArr != n)
    }));
  }

	noMorePossibilities = () => {
  	const unusedNumbers = Numbers.list.filter((n) => (this.state.usedNumbers.indexOf(n) === -1 && n < this.state.numberOfStars));
    
    for (let ni = 0; ni < unusedNumbers.length;ni++) {
    	const testNumber = unusedNumbers[ni];
  		const otherNumbers = unusedNumbers.filter((n) => n !== testNumber);
      for (let oni = 0; oni<otherNumbers.length;oni++) {
      	if ((testNumber + otherNumbers[oni]) === this.state.numberOfStars) { return false; }
      }
    }
    
  	return true;
  }
  
	determineGameState = () => {
		let newEndMessage;
    
    if (this.state.usedNumbers.length === Numbers.list.length) {
    	newEndMessage = 'You won!';
    } else if (this.state.redraws === 0 && this.noMorePossibilities()) {
    	newEndMessage = 'Looooser!';
    }
    
    this.setState((prevState) => ({
      endMessage: newEndMessage
    }));
  }
  
	checkAnswer = () => {
  	this.setState((prevState) => ({
    	lastAnswerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((a,n) => a + n, 0)
    }), () => this.determineGameState());
  }
  
  acceptAnswer = () => {
  	if (this.state.selectedNumbers.length == 0) { return; }
    
    this.setState((prevState) => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
    	lastAnswerIsCorrect: null,
      selectedNumbers: [],
	    numberOfStars: Game.pickNumberOfStars(),
    }), () => this.determineGameState());
  }

	restartGame = () => {
  	this.setState(this.getInitialState());
  }
  
	render() {
    const { 
    	selectedNumbers,
      numberOfStars,
      lastAnswerIsCorrect,
      usedNumbers,
      redraws,
      endMessage,
      } = this.state;
  	return (
	  	<div className="container">
      	<h3>Play Nine</h3>
        <hr/>
        <div className="row">
          <Stars numberOfStars={numberOfStars} />
          <Button selectedNumbers={selectedNumbers} checkAnswer={this.checkAnswer} lastAnswerIsCorrect={lastAnswerIsCorrect} acceptAnswer={this.acceptAnswer} redraw={this.redraw} redraws={redraws} />
          <Answer selectedNumbers={selectedNumbers} selectNumber={this.deSelectNumber} />
	      </div>
        <Numbers selectedNumbers={this.state.selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers} endMessage={endMessage} restartGame={this.restartGame} />
      </div>
    );
  }
}

class App extends React.Component {
	render() {
  	return (
    	<div>
      	<Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);

