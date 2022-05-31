import React, { FC } from 'react';
import { Figure } from '../../models/figures/Figure';

interface LostFiguresProps {
	figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ figures }) => {
	return (
		<div className='lost-figure'>
			{figures.map(figure => (
				<i
					key={figure.id}
					className={`fas fa-chess-${figure.logo}-piece ${figure.color}`}
				></i>
			))}
		</div>
	);
};

export default LostFigures;
