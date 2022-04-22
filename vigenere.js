//Vigenere JS code
//Authored by Garrett Sanders, Hez Thang, and Michael Thorman
//Goal of this program will be to solve a vigenere cipher given the ciphertext and a vigenere key.

//Basic mod function for easue of use
function mod(x, y){
	return (((x % y) + y) % y);
}

//This function performs the swapping of letters in the blocks to crack the cipher
function decrypt(vigKey){
	let plaintext = "";
	let ciphertext = document.getElementById("ciphertext").value;
	ciphertext = String(ciphertext).replace(/\s+/g, '');
	ciphertext = ciphertext.toLowerCase();
	for(let i = 0; i < ciphertext.length; i++){
		let vigKeyPos = mod(i, vigKey.length);
		let cipherLetterCode = ciphertext.charCodeAt(i) - 97;		
		let vigKeyLetterCode = vigKey.charCodeAt(vigKeyPos) - 97;
		let plainLetterCode = mod(cipherLetterCode - vigKeyLetterCode, 26) + 97;
		plaintext += String.fromCharCode(plainLetterCode);
	}
	document.getElementById("output").value = plaintext;
	return;
}

//This function will take in the provided Vigenere key and ciphertext and decrypt and place it into the decryption area
function decipher() {
	let vigKey = document.getElementById("vigenereKey").value;
	vigKey = vigKey.toLowerCase();
	//Run a check for letters and empty key
	if(vigKey.length === 0) {
		document.getElementById("output").value = "Please input your vigenere key as a comma separated list of letters";
	} else {
		vigKey = vigKey.replaceAll(',','');
		decrypt(vigKey);
	}
	return;
}