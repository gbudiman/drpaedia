// const util = require('util');
// const colors = require('colors');

var human_readable_result = false;

SParser.prototype.mock = function(x) {
  this.conditions = x;

  if (this.verbose & 0x1 == 1) {
    console.log('Factory Girl:');
    console.log(this.conditions);
  }
}

SParser.prototype.set_verbose = function(x) {
  this.verbose = x;
  return this;
}

SParser.prototype.expect = function(expectation, x) {
  this.mock(x.data);
  this.parse(this.preset);

  if (expectation != null) {
    if (this.latch_result != expectation) {
      console.log('TEST FAILED!'.red.inverse);
    } else {
      console.log('TEST PASSED!'.green.inverse);
    }
  }

  return this;
}

SParser.prototype.test = function(x) {
  this.expect(null, x);
  return {
    result: this.latch_result,
    logical_trees: this.logical_trees,
    conditions: this.conditions
  }
}

SParser.prototype.human_readable_result = function() {
  var highlight_in_list = function(list, _highlight) {
    if (_highlight == undefined) {
      return list.join(', ');
    } else {
      var highlight = _highlight;
      if (!Array.isArray(_highlight)) {
        highlight = new Array(_highlight);
      }

      var s = '';
      list.forEach(function(x) {
        if (highlight.indexOf(x) != -1) {
          s += x.inverse + ', ';
        } else {
          s += x + ', ';
        }
      })

      return s.slice(0, -2);
    }
  }

  var unroll = function(composite, depth, context, _invert) {
    var invert = _invert == undefined ? false : _invert;

    if (composite.operator != undefined) {
      //console.log('Depth ' + depth + ' << ' + composite.operator.toUpperCase() + ' >>');

      var h = '';
      var s = '';
      switch(composite.operator) {
        case 'and': h = 'All of the following:'; break;
        case 'or':  h = 'Any one of the following:'; break;
        case 'not': h = 'None of the following:'; break;
      }

      s = Array((depth) * 4).join(' ') + (composite.result ? '✓ ' : '✗ ') + h;
      if (composite.result) {
        console.log(s.green);
      } else {
        console.log(s.red);
      }

      composite.data.forEach(function(x) {
        unroll(x, depth + 1, context, composite.operator == 'not' ? true : false);
      })
      
    } else {
      //console.log('Depth ' + depth + ': ');
      //console.log(composite);

      var s = '';
      var p = composite.result ? '✓ ' : '✗ ';
      var h = '';
      switch(composite.condition[0]) {
        case 'p': 
          s += 'Profession: '; 
          s += highlight_in_list(composite.condition.slice(1), context.conditions.professions);
          break;
        case 'k': 
          s += 'Skill: '; 
          s += highlight_in_list(composite.condition.slice(1), context.conditions.skills);
          break;
        case 's': 
          //console.log(composite.condition);
          //console.log(new Array(context.conditions));
          s += 'Strain: '; 
          s += highlight_in_list(composite.condition.slice(1), context.conditions.strain);
          break;
        case 'xp_sum': 
          s += 'XP >= '; 
          s += composite.condition[1];
          break;
        case 'stat_sum':
          switch(composite.condition[1]) {
            case 'hp_or_mp': s += 'HP/MP >= '; break;
            case 'hp': s += 'HP >= '; break;
            case 'mp': s += 'MP >= '; break;
          }

          s += composite.condition[2];
          break;
        case 'lore_type':
          s += 'Lore skills count >= ';
          s += composite.condition[1];
          break;
        case 'psionic_type':
          switch(composite.condition[1]) {
            case 'basic': s += 'Basic Psionic skills >= '; break;
            case 'intermediate': s += 'Intermediate Psionic skills >= '; break;
            case 'advanced': s += 'Advanced Psionic skills >= '; break;
          }
          s += composite.condition[2];
          break;
      }

      s = Array(depth * 4).join(' ') + p + s;// + composite.condition.slice(1).join(', ');

      if (invert) {
        composite.result = !composite.result;
      }

      if (composite.result) {
        console.log(s.green);  
      } else {
        console.log(s.red);
      }
      
    }
  }

  //console.log(util.inspect(this.logical_trees, { showHidden: false, depth: null }));

  var that = this;
  this.logical_trees.forEach(function(x) {
    unroll(x, 0, that);
  });
}

SParser.prototype.parse = function(x) {
  this.parse_trees = new Array();
  this.start_pointers = new Array();
  this.logical_trees = new Array();

  var depth = 0;
  var splits = x.split(/\s+/);
  var has_closing_quote = function(y, matcher_quote) {
    var quotes = y.match(/([\'\"])/);
    if (quotes) {
      var closing_quote = quotes[0];
      if (closing_quote == matcher_quote) { return true; }
    }

    return false;
  };

  var handle_parenthesis = function() {
    var current = splits[i];
    var end_quote;

    if (quotes == undefined) {
      if (current[0] != undefined) {
        quotes = current.match(/^([\'\"])/);
      }
    }

    if (current != undefined) {
      end_quote = current.match(/([\'\"'])$/);
      if (end_quote != undefined && quotes != undefined) { 
        if (quotes[1] == end_quote[1]) {
          return;
        }
      }
    }

    if (quotes) {
      var quote_type = quotes[1];
      i += 1;

      while(true) {
        if (i >= splits.length) {
          break;
        }

        actual += ' ' + splits[i];
        //console.log('appending ' + splits[i]);
        if (has_closing_quote(splits[i], quote_type)) {
          break;
        }

        i += 1;
      }
    }
  }

  var handle_ellipsis = function() {
    if (current.match(/([\'\"])/)) {
      quotes = current.match(/([\'\"])/);
      //console.log(quotes);
    }

    if (current == '(' || next == ')') {
      actual += next;
      i++;
    }
  }

  if ((this.verbose & 0x1) == 1) {
    console.log('Input: ' + x);
  }

  try {
    for (var i = 0; i < splits.length; i++) {
      var current = splits[i];
      var next = splits[i + 1];
      var actual = current;
      var quotes = undefined;

      handle_ellipsis();
      handle_parenthesis();

      if (quotes != undefined) {
        var re = new RegExp(quotes[1], 'g');
        actual = actual.replace(re, '');
      }
      //console.log('inserting ' + actual);
      depth = this.insert_to_tree(actual, depth);
    }
  } catch(err) {
    switch(err.name) {
      case 'TypeError': console.log('Naked expression'); break;
    }
    console.log(err);
    throw(err);
  }

  if (this.start_pointers.length > 0) {
    throw new Error('Non-empty pointers, dangling expression: ' + this.start_pointers);
  }

  if (human_readable_result) {
    this.human_readable_result();
  }
};

SParser.prototype.cond = function(x, val, custom_function) {
  switch (x) {
    case 'profession':
      if (this.conditions.professions == undefined || 
          this.conditions.professions.indexOf(val) == -1) {
        return false;
      }

      return true;
      break;
    case 'skill':
      if (this.conditions.skills == undefined || 
          this.conditions.skills.indexOf(val) == -1) {
        return false;
      }

      return true;
      break;
    default:
      if (custom_function == undefined) {
        if (this.conditions[x] == undefined || 
            this.conditions[x] != val) {
          return false;
        }

        return true;
      } else {
        if (this.conditions[x] == undefined) { return false; }
        return custom_function(this.conditions[x], val);
      }
  }
}

SParser.prototype.insert_to_tree = function(x, depth) {
  var is_opening = x[0] == '(';
  var is_closing = x[x.length - 1] == ')';
  //console.log('inserting ' + x);

  if (is_opening) {
    var subsplit = x.split(/\(/);
    var non_opening = subsplit[subsplit.length - 1];
    var opening_count = (x.match(/\(/g) || []).length;

    for (var i = 0; i < opening_count; i++) {
      var text = i < opening_count - 1 ? '(' : non_opening;
      this.debug(depth, 'open', text);
      this.create_node(text);
      depth = depth + 1;
    }
    return depth;
  } else if (is_closing) {
    var non_closing = x.split(/\)/)[0];
    var closing_count = (x.match(/\)/g) || []).length;

    if (non_closing.length > 0) {
      this.debug(depth, 'append', non_closing);
      this.append_node(non_closing);
    }

    for (var i = 0; i < closing_count; i++) {
      depth = depth - 1;
      this.debug(depth, 'close', '');
      this.close_node();
    }

    return depth;
  } else {
    if (x.length > 0) {
      this.debug(depth, 'append', x);
      this.append_node(x);
    }
    return depth;
  }
};

SParser.prototype.debug = function(depth, type, x) {
  if ((this.verbose & 0x2) != 0x2) { return; }
  var s = ' ';

  for (var i = 0; i < depth; i++) {
    s += '  ';
  }

  s += '> ';
  switch(type) {
    case 'open':      s += 'New list: '; break;
    case 'append':    s += 'Append  : '; break;
    case 'close':     s += 'Close'     ; break;
  }
  s += x;

  console.log(s);
}

SParser.prototype.create_node = function(x) {
  this.start_pointers.push(this.parse_trees.length);
  this.parse_trees.push(x);
}

SParser.prototype.append_node = function(x) {
  this.parse_trees.push(x);
}

SParser.prototype.close_node = function() {
  var previous_pointer = this.start_pointers.pop();
  var syntax = new Array();

  for (var i = previous_pointer; i < this.parse_trees.length; i++) {
    if (Array.isArray(this.parse_trees[i])) {
      this.parse_trees[i].forEach(function(x) { 
        syntax.push(x); 
      });

    } else {
      syntax.push(this.parse_trees[i]);
    }
  }

  var comprehension_result = this.context_comprehension(syntax);
  this.parse_trees.splice(previous_pointer, syntax.length + 1, comprehension_result);

  if ((this.verbose & 0x4) == 0x4) {
    console.log('Syntax: ' + syntax + ' => ' + comprehension_result);
  }

  if ((this.verbose & 0x8) == 0x8) {
    if (!comprehension_result) {
      console.log('(' + syntax.join(',') + ') => ' + comprehension_result);
    }
  }

  switch(syntax[0]) {
    case 'xp_sum':
    case 'stat_sum':
    case 'p':
    case 's':
    case 'k':
    case 'lore_type':
    case 'psionic_type':
      this.logical_trees.push({condition: syntax, result: comprehension_result});
      break;
    case 'and':
    case 'or':
    case 'not':
      var pop_count = syntax.length - 1;
      var logicalized = new Array();
      for (var i = 0; i < pop_count; i++) {
        logicalized.push(this.logical_trees.pop());
      }

      this.logical_trees.push({
        operator: syntax[0],
        data: logicalized,
        result: comprehension_result
      })
      break;

    default:
      //console.log(syntax);
  }

  this.latch_result = comprehension_result;
  // console.log('PT: ' + parse_trees);
}

SParser.prototype.check_arglength_exactly = function(l, size) {
  if (l.length != size) {
    throw new Error(size + ' arguments required, received ' + l.length);
  }
}

SParser.prototype.context_comprehension = function(l) {
  var head = l[0];
  var rest = l.slice(1);

  switch(head) {
    case 's':            return this.func_strain(rest);
    case 'p':            return this.func_profs(rest);
    case 'k':            return this.func_skills(rest);
    case 'psionic_type': return this.func_psionic_type(rest);
    case 'lore_type':    return this.func_lore_count(rest);
    case 'xp_sum':       return this.func_xp_sum(rest);
    case 'stat_sum':     return this.func_stat_sum(rest);
    case 'and':          return this.func_and(rest);
    case 'or':           return this.func_or(rest);
    case 'not':          return this.func_not(rest);
    case '(':            return rest;
    default:             return l;
  }
}

function load_defaults() {
  var s = new Object();

  // s.apo_templar = new SParser('\
  //   (and ((xp_sum 100) \
  //         (stat_sum hp_or_mp 50)\ 
  //         (p Priest) \
  //         (p (Guard Officer))))');
  // s.avontuur = new SParser('\
  //   (and ((xp_sum 100) \
  //         (stat_sum hp_or_mp 50) \
  //         (p (Gambler Scavenger Teacher Jones))))')
  // s.bone_breaker = new SParser('\ 
  //   (and ((xp_sum 100) \
  //         (stat_sum hp_or_mp 50) \
  //         (p (Thug Pugilist))))')
  // s.entrepreneur = new SParser(' \
  //   (and ((not (s "The Red Star")) \
  //         (xp_sum 100)\
  //         (stat_sum hp_or_mp 50) \
  //         (p ("Caravan Driver" "Hook-Up" Merchant Publican))))')
  // s.free_radical = new SParser(' \
  //   (and ((s Retrograde) \
  //         (xp_sum 100) \
  //         (stat_sum hp_or_mp 50)))')
  // s.g_man = new SParser(' \
  //   (and ((or ((s "Pure Blood") \
  //              (k "Lore - Strain - Pure Blood"))) \
  //         (xp_sum 100) \
  //         (stat_sum hp_or_mp 50) \
  //         (k Literacy) \
  //         (k "Lore - Pre-Fall History Modern") \
  //         (k (Torture Interrogate))))')
  // s.gear_head = new SParser(' \
  //   (and ((xp_sum 100) \
  //         (stat_sum hp_or_mp 50) \
  //         ((or (p (Caravan Driver "Hook-Up" Merchant Engineer "Mad Scientist")) \
  //              (s ("Diesel Jock" Rover)))) \
  //         (k ("Building Tomorrow" Brewing "Forging the Future"))))')
  // s.grave_robber = new SParser(' \
  //   (and ((xp_sum 100)\
  //         (stat_sum hp_or_mp 50)\
  //         (p (Doctor Sawbones)) \
  //         (p (Scavenger Thief Assassin Jones))))')
  // s.marksman = new SParser(' \
  //   (and ((xp_sum 100) \
  //         (stat_sum hp_or_mp 50)\
  //         (p (Sniper "Gun Slinger"))))')
  // s.mercenary = new SParser(' \
  //   (and ((xp_sum 100) \
  //         (stat_sum hp_or_mp 50)\
  //         (p (Soldier Guard Officer Hunter))))')
  // s.merican_badass = new SParser(' \
  //   (and ((xp_sum 100) \
  //         (stat_sum hp 50) \
  //         (s Merican)\
  //         (p Priest) \
  //         (p (Guard Officer "Gun Slinger" Hunter Primitive Pugilist Soldier Thug))))')
  // s.mind_killer = new SParser(' \
  //   (and ((xp_sum 200) \
  //         (stat_sum hp_or_mp 50) \
  //         (k "Mind Resistance")))')
  // s.monk = new SParser(' \
  //   (and ((xp_sum 100)\
  //         (stat_sum hp_or_mp 50) \
  //         (p ("Martial Artist" Priest))))')
  // s.mountebank = new SParser(' \
  //   (and ((xp_sum 100) \
  //         (stat_sum mp 100) \
  //         (p (Charlatan Gambler Merchant Politician))))')
  // s.nephilim = new SParser(' \
  //   (and ((xp_sum 200) \
  //         (stat_sum mp 50) \
  //         (s ("Nation of Accensor" Remnant))))')
  // s.oni = new SParser(' \
  //   (and ((xp_sum 100)  \
  //         (stat_sum hp_or_mp 50)\
  //         (s "The Red Star") \
  //         (p Priest) \
  //         (p (Guard Officer "Gun Slinger" Primitive Soldier))))')
  // s.overlord = new SParser('\
  //   (and ((xp_sum 100)\
  //         (stat_sum hp_or_mp 50) \
  //         (p (Assassin Doctor Gambler "Mad Scientist" "Ring Leader" Engineer)) \
  //         (p (Charlatan Entertainer Politician Priest Teacher))))')
  // s.reaper = new SParser(' \
  //   (and ((xp_sum 100)\
  //         (p ("Gun Slinger" Hunter Primitive Soldier))))')
  // s.sage = new SParser('\
  //   (and ((xp_sum 100) \
  //         (stat_sum mp 50) \
  //         (p (Jones Printer Teacher)) \
  //         (lore_type 4)))');
  // s.saint = new SParser(' \
  //   (and ((xp_sum 100)\
  //         (or ((p (Cook Doctor Priest Teacher))  \
  //              (s "Nation of Accensor"))) \
  //         ((not (s "The Red Star")))))')
  // s.shadow = new SParser(' \
  //   (and ((xp_sum 200) \
  //         (stat_sum hp_or_mp 50)\
  //         (p (Assassin Thief Spy))))')
  // s.shepherd = new SParser(' \
  //   (and ((xp_sum 200) \
  //         (stat_sum hp_or_mp 100) \
  //         (p (Cook Brewer Teacher Entertainer Farmer Fishmonger))))')
  // s.survivor = new SParser(' \
  //   (and ((xp_sum 200) \
  //         (stat_sum hp_and_mp 100)))')
  // s.techno_savant = new SParser('\
  //   (and ((xp_sum 100)\
  //         (stat_sum hp_or_mp 50) \
  //         (p ("Mad Scientist" Tinker Engineer))))')
  // s.thought_bender = new SParser(' \
  //   (and ((xp_sum 100)  \
  //         (stat_sum mp 50) \
  //         (p Psionist) \
  //         (psionic_type advanced 2)))')
  // s.veteran = new SParser(' \
  //   (and ((xp_sum 200)\
  //         (k "Lore - Local Area")))')
  // s.villon = new SParser('\
  //   (and ((xp_sum 100) \
  //         (p (Thief Assassin Spy))))')

  return s;
}

function log_human_readable_result(value) {
  human_readable_result = value;
}

function display_human_readable_result(x) {
  var sp = new SParser(null);
  sp.logical_trees = x.logical_trees;
  sp.conditions = x.conditions;
  sp.human_readable_result();
}

// module.exports = {
//   SParser: SParser,
//   log_human_readable_result: log_human_readable_result,
//   display_human_readable_result: display_human_readable_result,
//   load_defaults: load_defaults
// }

function SParser(x) {
  this.parse_trees;
  this.start_pointers;
  this.conditions;
  this.verbose = 0;
    // 0x1 - I/O
    // 0x2 - Parse trees
    // 0x4 - Context comprehension
  this.latch_result;
  this.preset = x;
  
  this.logical_trees;

  var func_not = function(l) {
    return !l[0];
  }

  var func_and = function(l) {
    return l.every(function(x) {
      return x;
    })
  }

  var func_or = function(l) {
    return l.some(function(x) {
      return x;
    })
  }

  var func_strain = function(l) {
    var that = this;
    var local_satisfaction = l.some(function(x) {
      return that.cond('strain', x);
    })

    return local_satisfaction;
  }

  var func_profs = function(l) {
    var that = this;
    var local_satisfaction = l.some(function(x) {
      return that.cond('profession', x);
    })

    return local_satisfaction;
  }

  var func_skills = function(l) {
    var that = this;
    var local_satisfaction = l.some(function(x) {
      return that.cond('skill', x);
    })

    return local_satisfaction;
  }

  var func_psionic_type = function(l) {
    this.check_arglength_exactly(l, 2);
    var s_class;
    var s_func = function(x, y) { return x >= y; }

    switch(l[0]) {
      case 'basic':         s_class = 'psionic_basic'; break;
      case 'intermediate':  s_class = 'psionic_intermediate'; break;
      case 'advanced':      s_class = 'psionic_advanced'; break;
      default:
        throw new Error('Unknown Psionic skill class: ' + l[0]);
    }

    return this.cond(s_class, l[1], s_func);
  }

  var func_lore_count = function(l) {
    this.check_arglength_exactly(l, 1);
    return this.cond('lore_count', l[0], function(x, y) { return x >= y; });
  }

  var func_xp_sum = function(l) {
    this.check_arglength_exactly(l, 1);
    return this.conditions.xp_sum >= l[0];
  }

  var func_stat_sum = function(l) {
    this.check_arglength_exactly(l, 2);

    switch(l[0]) {
      case 'hp':       return this.conditions.hp >= l[1];
      case 'mp':       return this.conditions.mp >= l[1];
      case 'hp_or_mp': return (this.conditions.hp || 0) 
                            + (this.conditions.mp || 0) >= l[1];
    }
  }

  this.func_strain = func_strain;
  this.func_profs = func_profs;
  this.func_skills = func_skills;
  this.func_psionic_type = func_psionic_type;
  this.func_lore_count = func_lore_count;
  this.func_xp_sum = func_xp_sum;
  this.func_stat_sum = func_stat_sum;
  this.func_and = func_and;
  this.func_or = func_or;
  this.func_not = func_not;

  return this;
}