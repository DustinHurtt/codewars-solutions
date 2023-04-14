// Codewars: Calculating with Functions
// Link: https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39
// Language: javascript
// Kyu: 5 kyu
function zero(...args) {
      if (args.length === 0) {
    return '0'
  } else {
    return Math.floor(eval("0" + " " + args[0]))
  }
}
function one(...args) {
      if (args.length === 0) {
    return '1'
  } else {
    return Math.floor(eval("1" + " " + args[0]))
  }
}
function two(...args) {
      if (args.length === 0) {
    return '2'
  } else {
    return Math.floor(eval("2" + " " + args[0]))
  }
}
function three(...args) {
      if (args.length === 0) {
    return '3'
  } else {
    return Math.floor(eval("3" + " " + args[0]))
  }
}
function four(...args) {
      if (args.length === 0) {
    return '4'
  } else {
    return Math.floor(eval("4" + " " + args[0]))
  }
}
function five(...args) {
    if (args.length === 0) {
    return '5'
  } else {
    return Math.floor(eval("5" + " " + args[0]))
  }
}
function six(...args) {
  if (args.length === 0) {
    return '6'
  } else {
    return Math.floor(eval("6" + " " + args[0]))
  }
}

function seven(...args) {
      if (args.length === 0) {
    return '7'
  } else {
    return Math.floor(eval("7" + " " + args[0]))
  }
}

function eight(...args) {
      if (args.length === 0) {
    return '8'
  } else {
    return Math.floor(eval("8" + " " + args[0]))
  }
}
function nine(...args) {
      if (args.length === 0) {
    return '9'
  } else {
    return Math.floor(eval("9" + " " + args[0]))
  }
}

function plus(...args) {
    return '+' + " " + args[0]
}
function minus(...args) {
  return '-' + " " + args[0]
}
function times(...args) {
    return '*' + " " + args[0]
}
function dividedBy(...args) {
    return '/' + " " + args[0]
}