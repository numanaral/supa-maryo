import { useOnResize } from 'hooks';
import useInternalGameActions from '../useInternalGameActions';

const useResizeEffect = () => {
	const { onResize } = useInternalGameActions();
	useOnResize(onResize);
};

export default useResizeEffect;
