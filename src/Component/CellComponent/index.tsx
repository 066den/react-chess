import React, { FC } from 'react';
import { Cell } from '../../models/Cell';

interface CellProps {
	cell: Cell;
	selected: boolean;
	click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
	return (
		<div
			className={[
				'cell',
				selected ? 'selected' : cell.color,
				cell.available && cell.figure ? 'available' : '',
			].join(' ')}
			onClick={() => click(cell)}
		>
			{cell.available && !cell.figure && <div className='available'></div>}
			{cell.figure?.logo && (
				<i
					className={`fas fa-chess-${cell.figure.logo}-piece ${cell.figure.color}`}
				></i>
			)}
		</div>
	);
};

export default CellComponent;
