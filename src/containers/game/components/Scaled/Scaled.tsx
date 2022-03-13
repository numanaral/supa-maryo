import styled, { css } from 'styled-components/macro';
import { Game } from 'game/types';
import { useGameContext } from 'game/hooks';
import { forwardRef } from 'react';

const Wrapper = styled.div<{
	$scale: Game.Scale;
}>`
	transform-origin: top left;
	${({ $scale }) => css`
		transform: scale(${$scale});
	`}
`;

const Scaled = forwardRef<
	HTMLDivElement,
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>
>(({ children, ...rest }, ref) => {
	const {
		view: { scale },
	} = useGameContext();
	return (
		<Wrapper $scale={scale} {...rest} ref={ref}>
			{children}
		</Wrapper>
	);
});

export default Scaled;
