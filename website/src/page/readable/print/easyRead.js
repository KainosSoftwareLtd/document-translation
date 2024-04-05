// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import "@cloudscape-design/global-styles/index.css";
import { useGetPresignedUrl } from "../hooks/useGetPresignedUrl";

function DisplayText({ text }) {
	const lines = text.split("\n").filter((line) => line.trim());

	return (
		<div>
			{lines.map((line) => (
				<p key={line}>{line}</p>
			))}
		</div>
	);
}

function SingleRow(props) {
	const imageUrl = useGetPresignedUrl(props.imageKey);
	return (
		<tr>
			<td>
				<div>
					{props.imageKey && <img src={imageUrl} alt={`Generated image`} />}
				</div>
			</td>
			<td>
				<div>
					<DisplayText text={props.text} />
				</div>
			</td>
		</tr>
	);
}

export function ReadablePrintPreview(props) {
	return (
		<>
			<table>
				<tbody>
					{props.textState?.map((textItem, index) => (
						<SingleRow
							key={index}
							text={textItem.output}
							imageKey={props.imageState[textItem.itemId]?.[0]?.output || null}
						/>
					))}
				</tbody>
			</table>
		</>
	);
}

export default ReadablePrintPreview;
