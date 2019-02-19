function encrypt(pText, k){
  // console.log("Encrypting");
  // console.log(pText);
  // console.log(k);
  let conv = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  let tLength = pText.length;
  let kLength = k.length;
  let plainText = pText.toUpperCase();
  let key = k.toUpperCase();
  let tArr = plainText.split("");
  let kArr = key.split("");
  let tIndex = 0;
  let kIndex = 0;
  let newIndex = 0;
  let shift = 0;
  let cypherText = "";
  for(tIndex; tIndex < tLength; tIndex++){
    if (kIndex == kLength){
      kIndex = 0;
    }
    shift = conv.indexOf(kArr[kIndex]);
    newIndex = conv.indexOf(tArr[tIndex]) + shift;
    if(newIndex >= 26){
      newIndex = newIndex-26;
    }
    tArr[tIndex] = conv[newIndex];
    kIndex++;
  }
  cypherText = tArr.join("");
  //print(cypherText);
  document.write(cypherText);
}

function decrypt(cText, k){
  // console.log("Decrypting");
  // console.log(cText);
  // console.log(k);
  let conv = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  let tLength = cText.length;
  let kLength = k.length;
  let cypherText = cText.toUpperCase();
  let key = k.toUpperCase();
  let tArr = cypherText.split("");
  let kArr = key.split("");
  let tIndex = 0;
  let kIndex = 0;
  let newIndex = 0;
  let shift = 0;
  let plainText = "";
  for(tIndex; tIndex < tLength; tIndex++){
    if (kIndex == kLength){
      kIndex = 0;
    }
    shift = conv.indexOf(kArr[kIndex]);
    newIndex = conv.indexOf(tArr[tIndex]) - shift;
    if(newIndex < 0){
      newIndex = newIndex+26;
    }
    tArr[tIndex] = conv[newIndex];
    kIndex++;
  }
  plainText = tArr.join("");
  //print(plainText);
  document.write(plainText);
}

function main(){
  let mode = document.getElementsByName("mode");
  if(mode[0].checked){
    let pText = document.getElementById("inText").value;
    let k = document.getElementById("key").value;
    encrypt(pText, k);
  }
  else{
    let cText = document.getElementById("inText").value;
    let k = document.getElementById("key").value;
    decrypt(cText, k);
  }
}
