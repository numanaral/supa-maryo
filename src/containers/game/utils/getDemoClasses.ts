/**
 * Classes to be used for showcasing how things work behind the scenes.
 * **Note**: Update url to the following: `/?q&demo=true&speed=slow`.
 *
 * STRETCH_GOAL: Allow in-game customization.
 *
 * @returns Class names to enable and customize showcasing.
 */
const getDemoClasses = () => {
	const urlSearchParams = new URLSearchParams(window.location.href);
	const demo = urlSearchParams.get('demo') === 'true';
	const speed = urlSearchParams.get('speed') || 'fast';

	if (!demo) return '';
	return ` demo ${speed}`;
};

export default getDemoClasses;
