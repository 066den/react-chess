import { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../../models/Colors';
import { Player } from '../../models/Player';

interface TimerProps {
	currentPlayer: Player | null;
	restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
	const [blackTime, setBlackTime] = useState(300);
	const [whiteTime, setWhiteTime] = useState(300);
	const timer = useRef<null | ReturnType<typeof setInterval>>(null);

	function startTimer() {
		if (timer.current) {
			clearInterval(timer.current);
		}

		const callback =
			currentPlayer?.color === Colors.WHITE
				? decrementWhiteTimer
				: decrementBlackTimer;

		timer.current = setInterval(callback, 1000);
	}

	function decrementBlackTimer() {
		setBlackTime(prev => (prev >= 1 ? prev - 1 : 0));
	}

	function decrementWhiteTimer() {
		setWhiteTime(prev => (prev >= 1 ? prev - 1 : 0));
	}

	const handleRestart = () => {
		setBlackTime(300);
		setWhiteTime(300);
		restart();
	};

	useEffect(() => {
		startTimer();
	}, [currentPlayer]);

	return (
		<>
			<div className='timer'>
				<h2 className={currentPlayer?.color === Colors.WHITE ? 'active' : ''}>
					Белые <span>{whiteTime}</span>
				</h2>
				{currentPlayer?.color === Colors.WHITE ? (
					<i className='fas fa-chess-clock'></i>
				) : (
					<i className='fas fa-chess-clock-flip'></i>
				)}

				<h2 className={currentPlayer?.color === Colors.BLACK ? 'active' : ''}>
					Чёрные <span>{blackTime}</span>
				</h2>
			</div>
			<button className='btn' onClick={() => handleRestart()}>
				Сброс
			</button>
		</>
	);
};

export default Timer;
