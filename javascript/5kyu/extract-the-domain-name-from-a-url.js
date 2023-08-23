// Codewars: Extract the domain name from a URL
// Link: https://www.codewars.com/kata/514a024011ea4fb54200004b
// Language: javascript
// Kyu: 5 kyu
function domainName(url){
  const isValidUrl = urlString=> {
      try { 
      	return Boolean(new URL(urlString)); 
      }
      catch(e){ 
      	return false; 
      }
  }

  if (isValidUrl(url) !== false) {
  const { host } = new URL(url)
  let invalid = url.split(".")[0]

    return host.split('.').filter((element) => element !== 'www')[0]
  } else {
    return url.split(".").filter((element) => element !== 'www')[0]
  }

}