// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from "react";

function detiledTimestamp(unixSeconds: number) {
	const unixMilliseconds = unixSeconds * 1000;
	const timestamp = new Date(unixMilliseconds);
	return timestamp.toLocaleString();
}

export function formatEstimatedCompletion(unixSeconds: number, jobStatus: string) {
	const jobOngoingStatuses = ["UPLOADED", "PROCESSING"]
	if (!jobOngoingStatuses.includes(jobStatus.toUpperCase())) {
		return ""
	}

	const estimatedLengthOfJobMins = 20
	const timestamp = new Date((unixSeconds + estimatedLengthOfJobMins * 60) * 1000);
	const now = new Date();

	const diff =  timestamp.getTime() - now.getTime();
	const diffMinutes = Math.round(diff / (1000 * 60));
	
	if (diffMinutes > 0) {
		return (
			<span title={detiledTimestamp(unixSeconds)}>
				{diffMinutes} minute{diffMinutes > 1 ? "s" : ""}
			</span>
		);
	}
	return (
		<span title={detiledTimestamp(unixSeconds)}>
			Now
		</span>
	);
}
