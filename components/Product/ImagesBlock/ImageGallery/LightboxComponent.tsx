import LightboxComponent, {
	LightboxExternalProps,
} from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";
import Inline from 'yet-another-react-lightbox/plugins/inline';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import * as React from 'react';

/**
 * The purpose of this intermediate component is to load the Lightbox and
 * its CSS dynamically only when the lightbox becomes interactive
 */
export default function Lightbox(
	props: Omit<LightboxExternalProps, "plugins">
) {

	return (
		<>
			<LightboxComponent
				// add plugins here
				plugins={[Inline, Fullscreen, Thumbnails]}
				{...props}
			/>
		</>
	);
}
