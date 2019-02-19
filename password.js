function decrypt(shiftArr, cText){
  let conv = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  let tLength = cText.length;
  let kLength = shiftArr.length;
  let cypherText = cText.toUpperCase();
  let tArr = cypherText.split("");
  let tIndex = 0;
  let kIndex = 0;
  let newIndex = 0;
  let shift = 0;
  let plainText = "";
  for(tIndex; tIndex < tLength; tIndex++){
    if (kIndex == kLength){
      kIndex = 0;
    }
    shift = shiftArr[kIndex];
    newIndex = conv.indexOf(tArr[tIndex]) - shift;
    if(newIndex < 0){
      newIndex = newIndex+26;
    }
    tArr[tIndex] = conv[newIndex];
    kIndex++;
  }
  plainText = tArr.join("");
  return(plainText);
}


function readFile(key, text, dict, wLen){
  var reader = new FileReader();
  reader.onload = function(evt) {
    compare(key, text, evt.target.result, wLen);
  };
  reader.readAsText(dict);
}

function compare(key, text, file, wLen){
  if(file.search(text.substr(0,wLen)) != -1){
    console.log("Key: "+key+" Text: "+text);
    //document.write("Key: "+key+" Text: "+text);
  }
  else{
    console.log("No Match");
  }
}


function keyFinder(kSpace, kLength, text, wLength, dict){
  let conv = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  let count = 0;
  let arr = [kLength];
  let i = 0;
  for(i; i < kLength; i++){
    arr[i] = 0;
  }

  let karr = [kLength];
  while(count < kSpace){
    let plain = decrypt(arr, text);
    let j = 1;
    let foo = 0;
    for(foo; foo < kLength; foo++){
      karr[foo] = conv[arr[foo]];
    }
    let key = karr.join("");
    readFile(key, plain, dict, wLength);
    arr[kLength-j]++;
    for(j; j <= kLength; j++){
      if(arr[kLength-j] > 25){
        arr[kLength-j] = 0;
        arr[kLength-(j+1)]++;
      }
    }
    count++;
  }
}

function main(){
  let text = document.getElementById("inText").value;
  let kLength = document.getElementById("key").value;
  let wLength = document.getElementById("fwl").value;
  let dict = document.getElementById("input").files[0];
  let kSpace = Math.pow(26, kLength);

  keyFinder(kSpace, kLength, text, wLength, dict);
}
