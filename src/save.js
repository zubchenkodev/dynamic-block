import { useBlockProps } from '@wordpress/block-editor';

const SaveBlock = () => {
	return (
		<p { ...useBlockProps.save() }>
			{ 'Boiler Plate – hello from the saved content!' }
		</p>
	);
}

export default SaveBlock;
