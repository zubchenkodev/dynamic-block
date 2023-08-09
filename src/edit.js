import { __ } from '@wordpress/i18n';

import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

const EditBlock = () => {
	return (
		<p { ...useBlockProps() }>
			{ __( 'Boiler Plate – hello from the editor!', 'boiler-plate' ) }
		</p>
	);
}

export default EditBlock;
