import React, { useEffect, useState } from 'react';
import './global.scss';
import BoardComponent from './Component/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import Timer from './Component/Timer';

function App() {
	const [board, setBoard] = useState(new Board());
	const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
	const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

	const restart = () => {
		const newBoard = new Board();
		newBoard.initCells();
		newBoard.addFigures();
		setBoard(newBoard);
	};

	function swapPlayer() {
		setCurrentPlayer(
			currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
		);
	}

	useEffect(() => {
		restart();
		setCurrentPlayer(whitePlayer);
	}, []);

	return (
		<div className='app'>
			<div className='heading'>
				<div className='players'>
					<Timer restart={restart} currentPlayer={currentPlayer} />
				</div>
			</div>
			<BoardComponent
				board={board}
				setBoard={setBoard}
				currentPlayer={currentPlayer}
				swapPlayer={swapPlayer}
			/>
		</div>
	);
}

export default App;
