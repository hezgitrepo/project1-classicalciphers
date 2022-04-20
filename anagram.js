//Anagram JS code
//Authored by Garrett Sanders, Hez Thang, and Michael Thorman
//Goal of this program will be to solve an anagram cipher given the ciphertext and an array of indices for how it should be interpreted.
//To help get to that point, there will be a second button to get the factors of the ciphertext so the user caan figurrre out the block size.

//This is a simple factoring function that returns a list of all factors
function getFactors(num) {
    const isEven = num % 2 === 0;
    const max = Math.sqrt(num);
    const inc = isEven ? 1 : 2;
    let factors = [1, num];
  
    for (let curFactor = isEven ? 2 : 3; curFactor <= max; curFactor += inc) {
      if (num % curFactor !== 0) continue;
      factors.push(curFactor);
      let compliment = num / curFactor;
      if (compliment !== curFactor) factors.push(compliment);
    }
  
    return factors;
  }
  
  
  //This function finds the factors of the ciphertext
  //It will also output the stripped ciphertext to the output box to keep the user informed
  function factor() {
      //retrieve cipher and output stripped version
      let ciphertext = document.getElementById("ciphertext").value;
      ciphertext = String(ciphertext).replace(/\s+/g, '');
      document.getElementById("output").value = ciphertext;
      //find the factors of the cipher given its length
      cipherLength = ciphertext.length;
      let factorArr = getFactors(cipherLength);
      const factorsDisp = document.getElementById("factorsDisplay");
      let factorString = factorArr.toString();
      factorsDisp.value = factorString;
      return;
  }
  
  //This function returns true if the value being tested contains any letters
  function containsAnyLetter(str) {
    return /[a-zA-Z]/.test(str);
  }
  
  //This function performs the swapping of letters in the blocks to crack the cipher
  function decrypt(keyArr){
      let plaintext = "";
      let blockSize = keyArr.length;
      let ciphertext = document.getElementById("ciphertext").value;
      ciphertext = String(ciphertext).replace(/\s+/g, '');
      //each block
      for(let blockPos = 0; blockPos < ciphertext.length; blockPos += blockSize){
          //in each block
          for(let i = 0; i < blockSize; i++){
              let keyPos = keyArr.indexOf(i);
              plaintext += ciphertext.substr(blockPos + keyPos, 1);
          }
      }
      document.getElementById("output").value = plaintext;
      return;
  }
  
  //This function will take in the provided anagram key and ciphertext and decrypt and place it into the decryption area
  function decipher() {
      let key = document.getElementById("anagramKey").value
      //Run a check for letters and empty key
      if(containsAnyLetter(key) || key.length === 0) {
          document.getElementById("output").value = "Please input your anagram key as a comma separated list of integers";
      } else {
          let keyArr = key.split(',');
          //adjust values to work with JS indices
          for(let i = 0; i < keyArr.length; i++) {
              keyArr[i] = keyArr[i] - 1;
          }
          decrypt(keyArr);
      }
  }