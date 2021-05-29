function			loadClient()
{
	let userBox = document.querySelector('.user');
	let navigation = document.querySelector('.navigation');
	let main = document.querySelector('.main');
	
	
	loadNavigation();
	loadUser();
}

document.onload = loadClient();