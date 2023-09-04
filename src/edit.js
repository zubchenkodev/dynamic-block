import { __ } from '@wordpress/i18n';

import { RawHTML } from '@wordpress/element';

import { useSelect } from '@wordpress/data';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, QueryControls } from '@wordpress/components';

import './editor.scss';

const EditBlock = ( { attributes, setAttributes } ) => {
	const { numberOfPosts, displayFeaturedImages, numberOfColumns, order, orderBy, categories } = attributes;

	const catIDs =
		categories && categories.length > 0
			? categories.map((cat) => cat.id)
			: [];


	const posts = useSelect(
		(select) => {
			return select('core').getEntityRecords('postType', 'post', {
				per_page: numberOfPosts,
				_embed: true,
				order,
				orderby: orderBy,
				categories: catIDs,
			});
		},
		[numberOfPosts, order, orderBy, categories]
	);

	const allCats = useSelect((select) => {
		return select('core').getEntityRecords('taxonomy', 'category', {
			per_page: -1,
		});
	}, []);

	const catSuggestions = {};

	if (allCats) {
		for (let i = 0; i < allCats.length; i++) {
			const cat = allCats[i];
			catSuggestions[cat.name] = cat;
		}
	}
	
	const onCategoryChange = (values) => {
		const hasNoSuggestions = values.some(
			(value) => typeof value === 'string' && !catSuggestions[value]
		);
		if (hasNoSuggestions) return;

		const updatedCats = values.map((token) => {
			return typeof token === 'string' ? catSuggestions[token] : token;
		});

		setAttributes({ categories: updatedCats });
	};

	const onDisplayFeaturedImageChange = (value) => {
		setAttributes({ displayFeaturedImages: value });
	};
	const onNumberOfItemsChange = (value) => {
		setAttributes({ numberOfPosts: value });
	};

	return (
		<>
		<InspectorControls>
				<PanelBody>
					<ToggleControl
						label={__('Display Featured Image', 'latest-posts')}
						checked={displayFeaturedImages}
						onChange={onDisplayFeaturedImageChange}
					/>
					<QueryControls
						numberOfItems={numberOfPosts}
						onNumberOfItemsChange={onNumberOfItemsChange}
						maxItems={10}
						minItems={1}
						orderBy={orderBy}
						onOrderByChange={(value) =>
							setAttributes({ orderBy: value })
						}
						order={order}
						onOrderChange={(value) =>
							setAttributes({ order: value })
						}
						categorySuggestions={catSuggestions}
						selectedCategories={categories}
						onCategoryChange={onCategoryChange}

					/>
				</PanelBody>
		</InspectorControls>
		<div className="latest-posts">
			<div className="container -big">
				<ul { ...useBlockProps({
					className: "latest-posts__grid"
				}) }>
					{ posts &&
						posts.map( ( post ) => {
							const featuredImage =
								post._embedded &&
								post._embedded[ 'wp:featuredmedia' ] &&
								post._embedded[ 'wp:featuredmedia' ].length >
									0 &&
								post._embedded[ 'wp:featuredmedia' ][ 0 ];
							return (
								<li key={ post.id }>
									{ displayFeaturedImages &&
										featuredImage && (
											<img
												src={
													featuredImage.media_details
														.sizes.medium_large
														.source_url
												}
												alt={ featuredImage.alt_text }
											/>
										) }
									<h4>
										<a href={ post.link }>
											{ post.title.rendered && (
												<RawHTML>
													{ post.title.rendered }
												</RawHTML>
											) }
										</a>
									</h4>
									{ post.excerpt.rendered && (
										<RawHTML>
											{ post.excerpt.rendered }
										</RawHTML>
									) }
								</li>
							);
						} ) }
				</ul>
			</div>
		</div>
		</>
	);
};

export default EditBlock;
