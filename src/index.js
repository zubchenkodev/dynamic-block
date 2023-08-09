import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

import metadata from './block.json';
import SaveBlock from './save';
import EditBlock from './edit';

const x = 3;

registerBlockType( metadata.name, {
	edit: EditBlock,
	save: SaveBlock
} );
