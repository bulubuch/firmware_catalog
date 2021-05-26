class cookies
{
	get(key) {
		let c  = document.cookie;
		let parts = c.split(";");
		for (let i = 0; i < parts.length; i++)
		{
			let k = c.search(key + "=");
			if (k >= 0) {
				return c.slice(k + key.length + 1);
			}
		}
		return (null);
	}
	set(key, value)
	{
		let cookies = [];
		let cookie = "";
		let c  = document.cookie;
		let k = -1;
		let parts = c.split(";");
		let i;
		for (i = 0; i < parts.length; i++)
		{
			k = c.search(key + "=");
			if (k >= 0) {
				continue;
			} else {
				cookies.push(c.split("="));
			}
		}
		cookies.push([key, value]);
		for (i = 0; i < cookies.length; i++)
		{
			cookie += cookies[i][0] + "=" + cookies[i][1] + ";";
		}
		document.cookie = cookie;
	}

	del(key)
	{
		let cookies = [];
		let cookie = "";
		let c  = document.cookie;
		let k = -1;
		let parts = c.split(";");
		let i;
		for (i = 0; i < parts.length; i++)
		{
			k = c.search(key + "=");
			if (k >= 0) {
				continue;
			} else {
				cookies.push(c.split("="));
			}
		}
		for (i = 0; i < cookies.length; i++)
		{
			cookie += cookies[i][0] + "=" + cookies[i][1] + ";";
		}
		document.cookie = cookie;
	}
}