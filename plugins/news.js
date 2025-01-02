const RSS_URL = `https://next.ink/feed/nobrief?rsskey=76815-40f88a5a-2337-4501-8efd-ace218783a04`;

fetch(RSS_URL)
.then(response => response.text())
.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
.then(data => {
    const items = data.querySelectorAll("item");
    const titleMaxLength = 82;
    let maxItems = 6;
    let html = ``;

    if (items.length < maxItems) {
        maxItems = items.length;
    }

    for (var i = 0; i < maxItems; i++) {
        const item = items[i];

        /* publication date */
        const d = new Date(item.querySelector("pubDate").innerHTML);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); /* january = 0 */

        /* link and description */
        const link = item.querySelector("link").innerHTML;
        let title = item.querySelector("title").innerHTML;

        //console.log(title.length);

        if (title.length > titleMaxLength) {
            title = title.slice(0, titleMaxLength) + "...";
        }

        html += `${day}/${month} <a href="${link}">${title}</a><br>`;
    }

    var element = document.getElementsByClassName("news")[0];

    /* replace div content */
    element.innerHTML = html;
});