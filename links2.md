---
layout: page
title: Links II - Revenge of the URLs 
permalink: /links2/
exclude_from_search: true
---

<ul id="lobf">
	<li>aHR0cHM6Ly93d3cud2F3YWNpdHkudGlwcy8=</li>
	<li>aHR0cHM6Ly93d3cuZXh0cmVtZS1kb3duLnRvb2xzLw==</li>
	<li>aHR0cHM6Ly9kYXJraXdvcmxkNy5jb20=</li>
	<li>aHR0cHM6Ly90ZWxlY2hhcmdlci1qZXV4cGMuZnIv</li>
	<li>aHR0cHM6Ly90aGVwaXJhdGViYXkub3JnL2luZGV4Lmh0bWw=</li>
	<li>aHR0cHM6Ly9idDRncHJ4LmNvbS8=</li>
	<li>aHR0cHM6Ly9ydXRyYWNrZXIub3JnL2ZvcnVtL3ZpZXd0b3BpYz90PTYzMjQ4NjY=</li>
	<li>aHR0cHM6Ly9ueWFhLnNpLw==</li>
	<li>aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2RyaXZlL2ZvbGRlcnMvMXVNVnVEdDNMUXgycVgwR3VDeTFmY0c0d3cwMnFBZ1VU</li>
	<li>aHR0cHM6Ly9kb3dubG9hZG11c2ljc2Nob29sLmNvbS9iYW5kY2FtcC8=</li>
	<li>aHR0cHM6Ly9sdWNpZGEudG8v</li>
	<li>aHR0cHM6Ly9ldS5kb3VibGVkb3VibGUudG9wLwo=</li>
	<li>aHR0cHM6Ly90aWRhbC5xcWRsLnNpdGU=</li>
	<li>aHR0cHM6Ly9ldS5xcWRsLnNpdGUvCg==</li>
	<li>aHR0cDovL3l0bXAzLm5ldC8=</li>
	<li>aHR0cHM6Ly93d3cuc2VlZHIuY2Mv</li>
	<li>aHR0cHM6Ly9kYXJrdG9ycmVudC5vcmcv</li>
	<li>aHR0cHM6Ly91dG9ycmVudG11c2ljLnJ1Lw==</li>
	<li>aHR0cHM6Ly9mci5kb3dubWFnYXoubmV0Lw==</li>
	<li>aHR0cHM6Ly9zY3JpcHRtYWZpYS5vcmcv</li>
	<li>aHR0cHM6Ly93d3cuc2VhcmNoZnRwcy5uZXQv</li>
	<li>aHR0cHM6Ly93d3cubW1udC5ydS9pbnQv</li>
	<li>aHR0cHM6Ly9zY2VuZS1ybHMubmV0Lw==</li>
	<li>aHR0cHM6Ly93d3cuc2tpZHJvd3JlbG9hZGVkLmNvbS8=</li>
	<li>aHR0cHM6Ly93d3cuZWxhbWlnb3NnYW1lcy5vcmcv</li>
	<li>aHR0cHM6Ly9pZ2ctZ2FtZXMuY29tLw==</li>
	<li>aHR0cHM6Ly9maXRnaXJsLXJlcGFja3Muc2l0ZS8=</li>
	<li>aHR0cHM6Ly9kb2RpLXJlcGFja3Muc2l0ZS8=</li>
	<li>aHR0cHM6Ly93d3cucHN4cmVuenVrb2tlbi5jb20v</li>
	<li>aHR0cDovL3JlZHVtcC5vcmcv</li>
	<li>aHR0cHM6Ly93d3cuc29uc2l2cmkudG8v</li>
</ul>

<script>
	const lobfLinks = document.querySelectorAll("#lobf li");

	// Loop through each string
	lobfLinks.forEach((item) => {
		item.addEventListener("mouseover", () => {
			// Check if the item has already been converted
			if (!item.dataset.converted) {
				// Decode the Base64 string
				const decodedUrl = atob(item.textContent.trim());
		
				// Create a clickable link
				const link = document.createElement("a");
				link.href = decodedUrl;
				link.textContent = decodedUrl;
				link.target = "_blank"; // Open in a new tab

				// Replace the list item content with the link
				item.textContent = ""; // Clear the existing text
				item.appendChild(link);
			}
		});
	});
</script>
