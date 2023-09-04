import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import metadata from './block.json';
import SaveBlock from './save';
import EditBlock from './edit';

registerBlockType( metadata.name, {
	edit: EditBlock,
	save: SaveBlock,
} );
