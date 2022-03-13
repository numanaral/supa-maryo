import { useEffect } from 'react';
import { throttle } from 'lodash';

interface WindowEvent extends UIEvent {
	readonly target: Window;
}
type OnResizeCb = (e: WindowEvent) => void;
interface OnResizeOptions {
	throttleMs?: number;
	triggerOnLoad?: boolean;
}

/**
 * Triggers the provided callback method on resize.
 *
 * @param onResize Callback method to trigger on resize.
 *
 * NOTE: Ensure that the cb is memoized. (e.g. with `useCallback`)
 * @param options Customize the throttle and initial trigger if needed.
 */
const useOnResize = (onResize: OnResizeCb, options: OnResizeOptions = {}) => {
	const { throttleMs = 500, triggerOnLoad = true } = options;

	useEffect(() => {
		const onResizeEffect = throttle((e: UIEvent) => {
			onResize(e as WindowEvent);
		}, throttleMs);

		window.addEventListener('resize', onResizeEffect);
		return () => {
			window.removeEventListener('resize', onResizeEffect);
		};
	}, [onResize, throttleMs]);

	useEffect(() => {
		if (!triggerOnLoad) return;
		window.dispatchEvent(new Event('resize'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export type { WindowEvent, OnResizeCb, OnResizeOptions };
export default useOnResize;
