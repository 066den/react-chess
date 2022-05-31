import React, { FC, Fragment, useEffect, useState } from 'react';
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import CellComponent from '../CellComponent';
import LostFigures from '../LostFigures';

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
	swapPlayer: () => void;
	currentPlayer: Player | null;
}

const BoardComponent: FC<BoardProps> = ({
	board,
	setBoard,
	currentPlayer,
	swapPlayer,
}) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	function click(cell: Cell) {
		if (
			selectedCell &&
			selectedCell !== cell &&
			selectedCell.figure?.canMove(cell)
		) {
			selectedCell.moveFigure(cell);
			swapPlayer();
			setSelectedCell(null);
			updateBoard();
		} else {
			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell);
			}
		}
	}

	function highlightCells() {
		board.highlightCells(selectedCell);
		updateBoard();
	}

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}

	useEffect(() => {
		highlightCells();
	}, [selectedCell]);

	return (
		<div className='board-wrap'>
			<div className='lost-figures'>
				<h3>Белые</h3>
				<LostFigures figures={board.lostWhiteFigures} />
			</div>
			<div className='board'>
				<div className='letters-panel'>
					<div className='letter'></div>
				</div>
				{board.cells.map((row, index) => (
					<Fragment key={index}>
						{row.map(cell => (
							<CellComponent
								click={click}
								key={cell.id}
								cell={cell}
								selected={
									selectedCell?.figure !== null &&
									cell.x === selectedCell?.x &&
									cell.y === selectedCell?.y
								}
							/>
						))}
					</Fragment>
				))}
			</div>
			<div className='lost-figures'>
				<h3>Чёрные</h3>
				<LostFigures figures={board.lostBlackFigures} />
			</div>
		</div>
	);
};

export default BoardComponent;
