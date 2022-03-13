import { forwardRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { useViewState } from 'game/hooks';
import { Game } from 'game/types';

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
	const { scale } = useViewState();
	return (
		<Wrapper $scale={scale} {...rest} ref={ref}>
			{children}
		</Wrapper>
	);
});

export default Scaled;
