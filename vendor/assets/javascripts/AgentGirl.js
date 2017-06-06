// module.exports = {
//   AgentGirl: AgentGirl
// }

AgentGirl.prototype.modify = function(property, val) {
  // perform deep copy
  // modify must NOT cause side-effect
  var raw_clone = JSON.parse(JSON.stringify(this.data));
  var clone = new AgentGirl(raw_clone);

  // if (clone.data.professions == undefined) {
  //   clone.data.professions = new Array();
  // }

  switch(property) {
    case 'add_profession':
      clone.data.professions.push(val);
      break;
    case 'set_professions':
      clone.data.professions = val;
      break;
    default: clone.data[property] = val;
  }

  return clone;
}

AgentGirl.prototype.add_profession = function(_val) {
  if (this.data.profession != undefined && 
      this.data.professions.length > 3) {
    throw new Error('Can only have a maximum of 3 professions');
  }

  return this.modify('add_profession', _val);
}

AgentGirl.prototype.set_professions = function(a, b, c) {
  var s = new Array();

  if (a != undefined) { s.push(a); }
  if (b != undefined) { s.push(b); }
  if (c != undefined) { s.push(c); }

  return this.modify('set_professions', s);
}

function AgentGirl(x) {
  this.data = x;
  if (this.data.professions == undefined) {
    this.data.professions = new Array();
  }
  return this;
}