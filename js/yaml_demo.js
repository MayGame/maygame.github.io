var demo = (function () {
    'use strict';
  
    function isNothing(subject) {
      return (typeof subject === 'undefined') || (subject === null);
    }
  
  
    function isObject(subject) {
      return (typeof subject === 'object') && (subject !== null);
    }
  
  
    function toArray(sequence) {
      if (Array.isArray(sequence)) return sequence;
      else if (isNothing(sequence)) return [];
  
      return [ sequence ];
    }
  
  
    function extend(target, source) {
      var index, length, key, sourceKeys;
  
      if (source) {
        sourceKeys = Object.keys(source);
  
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
  
      return target;
    }
  
  
    function repeat(string, count) {
      var result = '', cycle;
  
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
  
      return result;
    }
  
  
    function isNegativeZero(number) {
      return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
    }
  
  
    var isNothing_1      = isNothing;
    var isObject_1       = isObject;
    var toArray_1        = toArray;
    var repeat_1         = repeat;
    var isNegativeZero_1 = isNegativeZero;
    var extend_1         = extend;
  
    var common = {
        isNothing: isNothing_1,
        isObject: isObject_1,
        toArray: toArray_1,
        repeat: repeat_1,
        isNegativeZero: isNegativeZero_1,
        extend: extend_1
    };
  
    // YAML error class. http://stackoverflow.com/questions/8458984
  
  
    function formatError(exception, compact) {
      var where = '', message = exception.reason || '(unknown reason)';
  
      if (!exception.mark) return message;
  
      if (exception.mark.name) {
        where += 'in "' + exception.mark.name + '" ';
      }
  
      where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';
  
      if (!compact && exception.mark.snippet) {
        where += '\n\n' + exception.mark.snippet;
      }
  
      return message + ' ' + where;
    }
  
  
    function YAMLException(reason, mark) {
      // Super constructor
      Error.call(this);
  
      this.name = 'YAMLException';
      this.reason = reason;
      this.mark = mark;
      this.message = formatError(this, false);
  
      // Include stack trace in error object
      if (Error.captureStackTrace) {
        // Chrome and NodeJS
        Error.captureStackTrace(this, this.constructor);
      } else {
        // FF, IE 10+ and Safari 6+. Fallback for others
        this.stack = (new Error()).stack || '';
      }
    }
  
  
    // Inherit from Error
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
  
  
    YAMLException.prototype.toString = function toString(compact) {
      return this.name + ': ' + formatError(this, compact);
    };
  
  
    var exception = YAMLException;
  
    // get snippet for a single line, respecting maxLength
    function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
      var head = '';
      var tail = '';
      var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  
      if (position - lineStart > maxHalfLength) {
        head = ' ... ';
        lineStart = position - maxHalfLength + head.length;
      }
  
      if (lineEnd - position > maxHalfLength) {
        tail = ' ...';
        lineEnd = position + maxHalfLength - tail.length;
      }
  
      return {
        str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, '→') + tail,
        pos: position - lineStart + head.length // relative position
      };
    }
  
  
    function padStart(string, max) {
      return common.repeat(' ', max - string.length) + string;
    }
  
  
    function makeSnippet(mark, options) {
      options = Object.create(options || null);
  
      if (!mark.buffer) return null;
  
      if (!options.maxLength) options.maxLength = 79;
      if (typeof options.indent      !== 'number') options.indent      = 1;
      if (typeof options.linesBefore !== 'number') options.linesBefore = 3;
      if (typeof options.linesAfter  !== 'number') options.linesAfter  = 2;
  
      var re = /\r?\n|\r|\0/g;
      var lineStarts = [ 0 ];
      var lineEnds = [];
      var match;
      var foundLineNo = -1;
  
      while ((match = re.exec(mark.buffer))) {
        lineEnds.push(match.index);
        lineStarts.push(match.index + match[0].length);
  
        if (mark.position <= match.index && foundLineNo < 0) {
          foundLineNo = lineStarts.length - 2;
        }
      }
  
      if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
  
      var result = '', i, line;
      var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
      var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  
      for (i = 1; i <= options.linesBefore; i++) {
        if (foundLineNo - i < 0) break;
        line = getLine(
          mark.buffer,
          lineStarts[foundLineNo - i],
          lineEnds[foundLineNo - i],
          mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
          maxLineLength
        );
        result = common.repeat(' ', options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) +
          ' | ' + line.str + '\n' + result;
      }
  
      line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
      result += common.repeat(' ', options.indent) + padStart((mark.line + 1).toString(), lineNoLength) +
        ' | ' + line.str + '\n';
      result += common.repeat('-', options.indent + lineNoLength + 3 + line.pos) + '^' + '\n';
  
      for (i = 1; i <= options.linesAfter; i++) {
        if (foundLineNo + i >= lineEnds.length) break;
        line = getLine(
          mark.buffer,
          lineStarts[foundLineNo + i],
          lineEnds[foundLineNo + i],
          mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
          maxLineLength
        );
        result += common.repeat(' ', options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) +
          ' | ' + line.str + '\n';
      }
  
      return result.replace(/\n$/, '');
    }
  
  
    var snippet = makeSnippet;
  
    var TYPE_CONSTRUCTOR_OPTIONS = [
      'kind',
      'multi',
      'resolve',
      'construct',
      'instanceOf',
      'predicate',
      'represent',
      'representName',
      'defaultStyle',
      'styleAliases'
    ];
  
    var YAML_NODE_KINDS = [
      'scalar',
      'sequence',
      'mapping'
    ];
  
    function compileStyleAliases(map) {
      var result = {};
  
      if (map !== null) {
        Object.keys(map).forEach(function (style) {
          map[style].forEach(function (alias) {
            result[String(alias)] = style;
          });
        });
      }
  
      return result;
    }
  
    function Type(tag, options) {
      options = options || {};
  
      Object.keys(options).forEach(function (name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
  
      // TODO: Add tag format check.
      this.tag           = tag;
      this.kind          = options['kind']          || null;
      this.resolve       = options['resolve']       || function () { return true; };
      this.construct     = options['construct']     || function (data) { return data; };
      this.instanceOf    = options['instanceOf']    || null;
      this.predicate     = options['predicate']     || null;
      this.represent     = options['represent']     || null;
      this.representName = options['representName'] || null;
      this.defaultStyle  = options['defaultStyle']  || null;
      this.multi         = options['multi']         || false;
      this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);
  
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
  
    var type = Type;
  
    /*eslint-disable max-len*/
  
  
  
  
  
    function compileList(schema, name, result) {
      var exclude = [];
  
      schema[name].forEach(function (currentType) {
        result.forEach(function (previousType, previousIndex) {
          if (previousType.tag === currentType.tag &&
              previousType.kind === currentType.kind &&
              previousType.multi === currentType.multi) {
  
            exclude.push(previousIndex);
          }
        });
  
        result.push(currentType);
      });
  
      return result.filter(function (type, index) {
        return exclude.indexOf(index) === -1;
      });
    }
  
  
    function compileMap(/* lists... */) {
      var result = {
            scalar: {},
            sequence: {},
            mapping: {},
            fallback: {},
            multi: {
              scalar: [],
              sequence: [],
              mapping: [],
              fallback: []
            }
          }, index, length;
  
      function collectType(type) {
        if (type.multi) {
          result.multi[type.kind].push(type);
          result.multi['fallback'].push(type);
        } else {
          result[type.kind][type.tag] = result['fallback'][type.tag] = type;
        }
      }
  
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
  
  
    function Schema(definition) {
      return this.extend(definition);
    }
  
  
    Schema.prototype.extend = function extend(definition) {
      var implicit = [];
      var explicit = [];
  
      if (definition instanceof type) {
        // Schema.extend(type)
        explicit.push(definition);
  
      } else if (Array.isArray(definition)) {
        // Schema.extend([ type1, type2, ... ])
        explicit = explicit.concat(definition);
  
      } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
        // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
        if (definition.implicit) implicit = implicit.concat(definition.implicit);
        if (definition.explicit) explicit = explicit.concat(definition.explicit);
  
      } else {
        throw new exception('Schema.extend argument should be a Type, [ Type ], ' +
          'or a schema definition ({ implicit: [...], explicit: [...] })');
      }
  
      implicit.forEach(function (type$1) {
        if (!(type$1 instanceof type)) {
          throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
        }
  
        if (type$1.loadKind && type$1.loadKind !== 'scalar') {
          throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
        }
  
        if (type$1.multi) {
          throw new exception('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
        }
      });
  
      explicit.forEach(function (type$1) {
        if (!(type$1 instanceof type)) {
          throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
        }
      });
  
      var result = Object.create(Schema.prototype);
  
      result.implicit = (this.implicit || []).concat(implicit);
      result.explicit = (this.explicit || []).concat(explicit);
  
      result.compiledImplicit = compileList(result, 'implicit', []);
      result.compiledExplicit = compileList(result, 'explicit', []);
      result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);
  
      return result;
    };
  
  
    var schema = Schema;
  
    var str = new type('tag:yaml.org,2002:str', {
      kind: 'scalar',
      construct: function (data) { return data !== null ? data : ''; }
    });
  
    var seq = new type('tag:yaml.org,2002:seq', {
      kind: 'sequence',
      construct: function (data) { return data !== null ? data : []; }
    });
  
    var map = new type('tag:yaml.org,2002:map', {
      kind: 'mapping',
      construct: function (data) { return data !== null ? data : {}; }
    });
  
    var failsafe = new schema({
      explicit: [
        str,
        seq,
        map
      ]
    });
  
    function resolveYamlNull(data) {
      if (data === null) return true;
  
      var max = data.length;
  
      return (max === 1 && data === '~') ||
             (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
    }
  
    function constructYamlNull() {
      return null;
    }
  
    function isNull(object) {
      return object === null;
    }
  
    var _null = new type('tag:yaml.org,2002:null', {
      kind: 'scalar',
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function () { return '~';    },
        lowercase: function () { return 'null'; },
        uppercase: function () { return 'NULL'; },
        camelcase: function () { return 'Null'; },
        empty:     function () { return '';     }
      },
      defaultStyle: 'lowercase'
    });
  
    function resolveYamlBoolean(data) {
      if (data === null) return false;
  
      var max = data.length;
  
      return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
             (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
    }
  
    function constructYamlBoolean(data) {
      return data === 'true' ||
             data === 'True' ||
             data === 'TRUE';
    }
  
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === '[object Boolean]';
    }
  
    var bool = new type('tag:yaml.org,2002:bool', {
      kind: 'scalar',
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function (object) { return object ? 'true' : 'false'; },
        uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
        camelcase: function (object) { return object ? 'True' : 'False'; }
      },
      defaultStyle: 'lowercase'
    });
  
    function isHexCode(c) {
      return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
             ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
             ((0x61/* a */ <= c) && (c <= 0x66/* f */));
    }
  
    function isOctCode(c) {
      return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
    }
  
    function isDecCode(c) {
      return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
    }
  
    function resolveYamlInteger(data) {
      if (data === null) return false;
  
      var max = data.length,
          index = 0,
          hasDigits = false,
          ch;
  
      if (!max) return false;
  
      ch = data[index];
  
      // sign
      if (ch === '-' || ch === '+') {
        ch = data[++index];
      }
  
      if (ch === '0') {
        // 0
        if (index + 1 === max) return true;
        ch = data[++index];
  
        // base 2, base 8, base 16
  
        if (ch === 'b') {
          // base 2
          index++;
  
          for (; index < max; index++) {
            ch = data[index];
            if (ch === '_') continue;
            if (ch !== '0' && ch !== '1') return false;
            hasDigits = true;
          }
          return hasDigits && ch !== '_';
        }
  
  
        if (ch === 'x') {
          // base 16
          index++;
  
          for (; index < max; index++) {
            ch = data[index];
            if (ch === '_') continue;
            if (!isHexCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== '_';
        }
  
  
        if (ch === 'o') {
          // base 8
          index++;
  
          for (; index < max; index++) {
            ch = data[index];
            if (ch === '_') continue;
            if (!isOctCode(data.charCodeAt(index))) return false;
            hasDigits = true;
          }
          return hasDigits && ch !== '_';
        }
      }
  
      // base 10 (except 0)
  
      // value should not start with `_`;
      if (ch === '_') return false;
  
      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
  
      // Should have digits and should not end with `_`
      if (!hasDigits || ch === '_') return false;
  
      return true;
    }
  
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch;
  
      if (value.indexOf('_') !== -1) {
        value = value.replace(/_/g, '');
      }
  
      ch = value[0];
  
      if (ch === '-' || ch === '+') {
        if (ch === '-') sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
  
      if (value === '0') return 0;
  
      if (ch === '0') {
        if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
        if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
        if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
      }
  
      return sign * parseInt(value, 10);
    }
  
    function isInteger(object) {
      return (Object.prototype.toString.call(object)) === '[object Number]' &&
             (object % 1 === 0 && !common.isNegativeZero(object));
    }
  
    var int = new type('tag:yaml.org,2002:int', {
      kind: 'scalar',
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
        octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
        decimal:     function (obj) { return obj.toString(10); },
        /* eslint-disable max-len */
        hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
      },
      defaultStyle: 'decimal',
      styleAliases: {
        binary:      [ 2,  'bin' ],
        octal:       [ 8,  'oct' ],
        decimal:     [ 10, 'dec' ],
        hexadecimal: [ 16, 'hex' ]
      }
    });
  
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
      // .2e4, .2
      // special case, seems not from spec
      '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
      // .inf
      '|[-+]?\\.(?:inf|Inf|INF)' +
      // .nan
      '|\\.(?:nan|NaN|NAN))$');
  
    function resolveYamlFloat(data) {
      if (data === null) return false;
  
      if (!YAML_FLOAT_PATTERN.test(data) ||
          // Quick hack to not allow integers end with `_`
          // Probably should update regexp & check speed
          data[data.length - 1] === '_') {
        return false;
      }
  
      return true;
    }
  
    function constructYamlFloat(data) {
      var value, sign;
  
      value  = data.replace(/_/g, '').toLowerCase();
      sign   = value[0] === '-' ? -1 : 1;
  
      if ('+-'.indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
  
      if (value === '.inf') {
        return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  
      } else if (value === '.nan') {
        return NaN;
      }
      return sign * parseFloat(value, 10);
    }
  
  
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
  
    function representYamlFloat(object, style) {
      var res;
  
      if (isNaN(object)) {
        switch (style) {
          case 'lowercase': return '.nan';
          case 'uppercase': return '.NAN';
          case 'camelcase': return '.NaN';
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case 'lowercase': return '.inf';
          case 'uppercase': return '.INF';
          case 'camelcase': return '.Inf';
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case 'lowercase': return '-.inf';
          case 'uppercase': return '-.INF';
          case 'camelcase': return '-.Inf';
        }
      } else if (common.isNegativeZero(object)) {
        return '-0.0';
      }
  
      res = object.toString(10);
  
      // JS stringifier can build scientific format without dots: 5e-100,
      // while YAML requres dot: 5.e-100. Fix it with simple hack
  
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
    }
  
    function isFloat(object) {
      return (Object.prototype.toString.call(object) === '[object Number]') &&
             (object % 1 !== 0 || common.isNegativeZero(object));
    }
  
    var float = new type('tag:yaml.org,2002:float', {
      kind: 'scalar',
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: 'lowercase'
    });
  
    var json = failsafe.extend({
      implicit: [
        _null,
        bool,
        int,
        float
      ]
    });
  
    var core = json;
  
    var YAML_DATE_REGEXP = new RegExp(
      '^([0-9][0-9][0-9][0-9])'          + // [1] year
      '-([0-9][0-9])'                    + // [2] month
      '-([0-9][0-9])$');                   // [3] day
  
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      '^([0-9][0-9][0-9][0-9])'          + // [1] year
      '-([0-9][0-9]?)'                   + // [2] month
      '-([0-9][0-9]?)'                   + // [3] day
      '(?:[Tt]|[ \\t]+)'                 + // ...
      '([0-9][0-9]?)'                    + // [4] hour
      ':([0-9][0-9])'                    + // [5] minute
      ':([0-9][0-9])'                    + // [6] second
      '(?:\\.([0-9]*))?'                 + // [7] fraction
      '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
      '(?::([0-9][0-9]))?))?$');           // [11] tz_minute
  
    function resolveYamlTimestamp(data) {
      if (data === null) return false;
      if (YAML_DATE_REGEXP.exec(data) !== null) return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
      return false;
    }
  
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0,
          delta = null, tz_hour, tz_minute, date;
  
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  
      if (match === null) throw new Error('Date resolve error');
  
      // match: [1] year [2] month [3] day
  
      year = +(match[1]);
      month = +(match[2]) - 1; // JS month starts with 0
      day = +(match[3]);
  
      if (!match[4]) { // no hour
        return new Date(Date.UTC(year, month, day));
      }
  
      // match: [4] hour [5] minute [6] second [7] fraction
  
      hour = +(match[4]);
      minute = +(match[5]);
      second = +(match[6]);
  
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) { // milli-seconds
          fraction += '0';
        }
        fraction = +fraction;
      }
  
      // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
  
      if (match[9]) {
        tz_hour = +(match[10]);
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
        if (match[9] === '-') delta = -delta;
      }
  
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  
      if (delta) date.setTime(date.getTime() - delta);
  
      return date;
    }
  
    function representYamlTimestamp(object /*, style*/) {
      return object.toISOString();
    }
  
    var timestamp = new type('tag:yaml.org,2002:timestamp', {
      kind: 'scalar',
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  
    function resolveYamlMerge(data) {
      return data === '<<' || data === null;
    }
  
    var merge = new type('tag:yaml.org,2002:merge', {
      kind: 'scalar',
      resolve: resolveYamlMerge
    });
  
    /*eslint-disable no-bitwise*/
  
  
  
  
  
    // [ 64, 65, 66 ] -> [ padding, CR, LF ]
    var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';
  
  
    function resolveYamlBinary(data) {
      if (data === null) return false;
  
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
  
      // Convert one by one.
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
  
        // Skip CR/LF
        if (code > 64) continue;
  
        // Fail on illegal characters
        if (code < 0) return false;
  
        bitlen += 6;
      }
  
      // If there are any bits left, source was corrupted
      return (bitlen % 8) === 0;
    }
  
    function constructYamlBinary(data) {
      var idx, tailbits,
          input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
          max = input.length,
          map = BASE64_MAP,
          bits = 0,
          result = [];
  
      // Collect by 6*4 bits (3 bytes)
  
      for (idx = 0; idx < max; idx++) {
        if ((idx % 4 === 0) && idx) {
          result.push((bits >> 16) & 0xFF);
          result.push((bits >> 8) & 0xFF);
          result.push(bits & 0xFF);
        }
  
        bits = (bits << 6) | map.indexOf(input.charAt(idx));
      }
  
      // Dump tail
  
      tailbits = (max % 4) * 6;
  
      if (tailbits === 0) {
        result.push((bits >> 16) & 0xFF);
        result.push((bits >> 8) & 0xFF);
        result.push(bits & 0xFF);
      } else if (tailbits === 18) {
        result.push((bits >> 10) & 0xFF);
        result.push((bits >> 2) & 0xFF);
      } else if (tailbits === 12) {
        result.push((bits >> 4) & 0xFF);
      }
  
      return new Uint8Array(result);
    }
  
    function representYamlBinary(object /*, style*/) {
      var result = '', bits = 0, idx, tail,
          max = object.length,
          map = BASE64_MAP;
  
      // Convert every three bytes to 4 ASCII characters.
  
      for (idx = 0; idx < max; idx++) {
        if ((idx % 3 === 0) && idx) {
          result += map[(bits >> 18) & 0x3F];
          result += map[(bits >> 12) & 0x3F];
          result += map[(bits >> 6) & 0x3F];
          result += map[bits & 0x3F];
        }
  
        bits = (bits << 8) + object[idx];
      }
  
      // Dump tail
  
      tail = max % 3;
  
      if (tail === 0) {
        result += map[(bits >> 18) & 0x3F];
        result += map[(bits >> 12) & 0x3F];
        result += map[(bits >> 6) & 0x3F];
        result += map[bits & 0x3F];
      } else if (tail === 2) {
        result += map[(bits >> 10) & 0x3F];
        result += map[(bits >> 4) & 0x3F];
        result += map[(bits << 2) & 0x3F];
        result += map[64];
      } else if (tail === 1) {
        result += map[(bits >> 2) & 0x3F];
        result += map[(bits << 4) & 0x3F];
        result += map[64];
        result += map[64];
      }
  
      return result;
    }
  
    function isBinary(obj) {
      return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
    }
  
    var binary = new type('tag:yaml.org,2002:binary', {
      kind: 'scalar',
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString       = Object.prototype.toString;
  
    function resolveYamlOmap(data) {
      if (data === null) return true;
  
      var objectKeys = [], index, length, pair, pairKey, pairHasKey,
          object = data;
  
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
  
        if (_toString.call(pair) !== '[object Object]') return false;
  
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey) pairHasKey = true;
            else return false;
          }
        }
  
        if (!pairHasKey) return false;
  
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
      }
  
      return true;
    }
  
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
  
    var omap = new type('tag:yaml.org,2002:omap', {
      kind: 'sequence',
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  
    var _toString$1 = Object.prototype.toString;
  
    function resolveYamlPairs(data) {
      if (data === null) return true;
  
      var index, length, pair, keys, result,
          object = data;
  
      result = new Array(object.length);
  
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
  
        if (_toString$1.call(pair) !== '[object Object]') return false;
  
        keys = Object.keys(pair);
  
        if (keys.length !== 1) return false;
  
        result[index] = [ keys[0], pair[keys[0]] ];
      }
  
      return true;
    }
  
    function constructYamlPairs(data) {
      if (data === null) return [];
  
      var index, length, pair, keys, result,
          object = data;
  
      result = new Array(object.length);
  
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
  
        keys = Object.keys(pair);
  
        result[index] = [ keys[0], pair[keys[0]] ];
      }
  
      return result;
    }
  
    var pairs = new type('tag:yaml.org,2002:pairs', {
      kind: 'sequence',
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  
    var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  
    function resolveYamlSet(data) {
      if (data === null) return true;
  
      var key, object = data;
  
      for (key in object) {
        if (_hasOwnProperty$1.call(object, key)) {
          if (object[key] !== null) return false;
        }
      }
  
      return true;
    }
  
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
  
    var set = new type('tag:yaml.org,2002:set', {
      kind: 'mapping',
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  
    var _default = core.extend({
      implicit: [
        timestamp,
        merge
      ],
      explicit: [
        binary,
        omap,
        pairs,
        set
      ]
    });
  
    /*eslint-disable max-len,no-use-before-define*/
  
  
  
  
  
  
  
    var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  
  
    var CONTEXT_FLOW_IN   = 1;
    var CONTEXT_FLOW_OUT  = 2;
    var CONTEXT_BLOCK_IN  = 3;
    var CONTEXT_BLOCK_OUT = 4;
  
  
    var CHOMPING_CLIP  = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP  = 3;
  
  
    var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  
  
    function _class(obj) { return Object.prototype.toString.call(obj); }
  
    function is_EOL(c) {
      return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
    }
  
    function is_WHITE_SPACE(c) {
      return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
    }
  
    function is_WS_OR_EOL(c) {
      return (c === 0x09/* Tab */) ||
             (c === 0x20/* Space */) ||
             (c === 0x0A/* LF */) ||
             (c === 0x0D/* CR */);
    }
  
    function is_FLOW_INDICATOR(c) {
      return c === 0x2C/* , */ ||
             c === 0x5B/* [ */ ||
             c === 0x5D/* ] */ ||
             c === 0x7B/* { */ ||
             c === 0x7D/* } */;
    }
  
    function fromHexCode(c) {
      var lc;
  
      if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
        return c - 0x30;
      }
  
      /*eslint-disable no-bitwise*/
      lc = c | 0x20;
  
      if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
        return lc - 0x61 + 10;
      }
  
      return -1;
    }
  
    function escapedHexLen(c) {
      if (c === 0x78/* x */) { return 2; }
      if (c === 0x75/* u */) { return 4; }
      if (c === 0x55/* U */) { return 8; }
      return 0;
    }
  
    function fromDecimalCode(c) {
      if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
        return c - 0x30;
      }
  
      return -1;
    }
  
    function simpleEscapeSequence(c) {
      /* eslint-disable indent */
      return (c === 0x30/* 0 */) ? '\x00' :
            (c === 0x61/* a */) ? '\x07' :
            (c === 0x62/* b */) ? '\x08' :
            (c === 0x74/* t */) ? '\x09' :
            (c === 0x09/* Tab */) ? '\x09' :
            (c === 0x6E/* n */) ? '\x0A' :
            (c === 0x76/* v */) ? '\x0B' :
            (c === 0x66/* f */) ? '\x0C' :
            (c === 0x72/* r */) ? '\x0D' :
            (c === 0x65/* e */) ? '\x1B' :
            (c === 0x20/* Space */) ? ' ' :
            (c === 0x22/* " */) ? '\x22' :
            (c === 0x2F/* / */) ? '/' :
            (c === 0x5C/* \ */) ? '\x5C' :
            (c === 0x4E/* N */) ? '\x85' :
            (c === 0x5F/* _ */) ? '\xA0' :
            (c === 0x4C/* L */) ? '\u2028' :
            (c === 0x50/* P */) ? '\u2029' : '';
    }
  
    function charFromCodepoint(c) {
      if (c <= 0xFFFF) {
        return String.fromCharCode(c);
      }
      // Encode UTF-16 surrogate pair
      // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
      return String.fromCharCode(
        ((c - 0x010000) >> 10) + 0xD800,
        ((c - 0x010000) & 0x03FF) + 0xDC00
      );
    }
  
    var simpleEscapeCheck = new Array(256); // integer, for fast access
    var simpleEscapeMap = new Array(256);
    for (var i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
  
  
    function State(input, options) {
      this.input = input;
  
      this.filename  = options['filename']  || null;
      this.schema    = options['schema']    || _default;
      this.onWarning = options['onWarning'] || null;
      // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
      // if such documents have no explicit %YAML directive
      this.legacy    = options['legacy']    || false;
  
      this.json      = options['json']      || false;
      this.listener  = options['listener']  || null;
  
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap       = this.schema.compiledTypeMap;
  
      this.length     = input.length;
      this.position   = 0;
      this.line       = 0;
      this.lineStart  = 0;
      this.lineIndent = 0;
  
      // position of first leading tab in the current line,
      // used to make sure there are no tabs in the indentation
      this.firstTabInLine = -1;
  
      this.documents = [];
  
      /*
      this.version;
      this.checkLineBreaks;
      this.tagMap;
      this.anchorMap;
      this.tag;
      this.anchor;
      this.kind;
      this.result;*/
  
    }
  
  
    function generateError(state, message) {
      var mark = {
        name:     state.filename,
        buffer:   state.input.slice(0, -1), // omit trailing \0
        position: state.position,
        line:     state.line,
        column:   state.position - state.lineStart
      };
  
      mark.snippet = snippet(mark);
  
      return new exception(message, mark);
    }
  
    function throwError(state, message) {
      throw generateError(state, message);
    }
  
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
  
  
    var directiveHandlers = {
  
      YAML: function handleYamlDirective(state, name, args) {
  
        var match, major, minor;
  
        if (state.version !== null) {
          throwError(state, 'duplication of %YAML directive');
        }
  
        if (args.length !== 1) {
          throwError(state, 'YAML directive accepts exactly one argument');
        }
  
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
  
        if (match === null) {
          throwError(state, 'ill-formed argument of the YAML directive');
        }
  
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
  
        if (major !== 1) {
          throwError(state, 'unacceptable YAML version of the document');
        }
  
        state.version = args[0];
        state.checkLineBreaks = (minor < 2);
  
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, 'unsupported YAML version of the document');
        }
      },
  
      TAG: function handleTagDirective(state, name, args) {
  
        var handle, prefix;
  
        if (args.length !== 2) {
          throwError(state, 'TAG directive accepts exactly two arguments');
        }
  
        handle = args[0];
        prefix = args[1];
  
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
        }
  
        if (_hasOwnProperty$2.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
  
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
        }
  
        try {
          prefix = decodeURIComponent(prefix);
        } catch (err) {
          throwError(state, 'tag prefix is malformed: ' + prefix);
        }
  
        state.tagMap[handle] = prefix;
      }
    };
  
  
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
  
      if (start < end) {
        _result = state.input.slice(start, end);
  
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 0x09 ||
                  (0x20 <= _character && _character <= 0x10FFFF))) {
              throwError(state, 'expected valid JSON character');
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, 'the stream contains non-printable characters');
        }
  
        state.result += _result;
      }
    }
  
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
  
      if (!common.isObject(source)) {
        throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
      }
  
      sourceKeys = Object.keys(source);
  
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
  
        if (!_hasOwnProperty$2.call(destination, key)) {
          destination[key] = source[key];
          overridableKeys[key] = true;
        }
      }
    }
  
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode,
      startLine, startLineStart, startPos) {
  
      var index, quantity;
  
      // The output is a plain object here, so keys can only be strings.
      // We need to convert keyNode to a string, but doing so can hang the process
      // (deeply nested arrays that explode exponentially using aliases).
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
  
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, 'nested arrays are not supported inside keys');
          }
  
          if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
            keyNode[index] = '[object Object]';
          }
        }
      }
  
      // Avoid code execution in load() via toString property
      // (still use its own toString for arrays, timestamps,
      // and whatever user schema extensions happen to have @@toStringTag)
      if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
        keyNode = '[object Object]';
      }
  
  
      keyNode = String(keyNode);
  
      if (_result === null) {
        _result = {};
      }
  
      if (keyTag === 'tag:yaml.org,2002:merge') {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json &&
            !_hasOwnProperty$2.call(overridableKeys, keyNode) &&
            _hasOwnProperty$2.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.lineStart = startLineStart || state.lineStart;
          state.position = startPos || state.position;
          throwError(state, 'duplicated mapping key');
        }
  
        // used for this specific key only because Object.defineProperty is slow
        if (keyNode === '__proto__') {
          Object.defineProperty(_result, keyNode, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: valueNode
          });
        } else {
          _result[keyNode] = valueNode;
        }
        delete overridableKeys[keyNode];
      }
  
      return _result;
    }
  
    function readLineBreak(state) {
      var ch;
  
      ch = state.input.charCodeAt(state.position);
  
      if (ch === 0x0A/* LF */) {
        state.position++;
      } else if (ch === 0x0D/* CR */) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
          state.position++;
        }
      } else {
        throwError(state, 'a line break is expected');
      }
  
      state.line += 1;
      state.lineStart = state.position;
      state.firstTabInLine = -1;
    }
  
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0,
          ch = state.input.charCodeAt(state.position);
  
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          if (ch === 0x09/* Tab */ && state.firstTabInLine === -1) {
            state.firstTabInLine = state.position;
          }
          ch = state.input.charCodeAt(++state.position);
        }
  
        if (allowComments && ch === 0x23/* # */) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
        }
  
        if (is_EOL(ch)) {
          readLineBreak(state);
  
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
  
          while (ch === 0x20/* Space */) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
  
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, 'deficient indentation');
      }
  
      return lineBreaks;
    }
  
    function testDocumentSeparator(state) {
      var _position = state.position,
          ch;
  
      ch = state.input.charCodeAt(_position);
  
      // Condition state.position === state.lineStart is tested
      // in parent on each call, for efficiency. No needs to test here again.
      if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
          ch === state.input.charCodeAt(_position + 1) &&
          ch === state.input.charCodeAt(_position + 2)) {
  
        _position += 3;
  
        ch = state.input.charCodeAt(_position);
  
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
  
      return false;
    }
  
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += ' ';
      } else if (count > 1) {
        state.result += common.repeat('\n', count - 1);
      }
    }
  
  
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding,
          following,
          captureStart,
          captureEnd,
          hasPendingContent,
          _line,
          _lineStart,
          _lineIndent,
          _kind = state.kind,
          _result = state.result,
          ch;
  
      ch = state.input.charCodeAt(state.position);
  
      if (is_WS_OR_EOL(ch)      ||
          is_FLOW_INDICATOR(ch) ||
          ch === 0x23/* # */    ||
          ch === 0x26/* & */    ||
          ch === 0x2A/* * */    ||
          ch === 0x21/* ! */    ||
          ch === 0x7C/* | */    ||
          ch === 0x3E/* > */    ||
          ch === 0x27/* ' */    ||
          ch === 0x22/* " */    ||
          ch === 0x25/* % */    ||
          ch === 0x40/* @ */    ||
          ch === 0x60/* ` */) {
        return false;
      }
  
      if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
        following = state.input.charCodeAt(state.position + 1);
  
        if (is_WS_OR_EOL(following) ||
            withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
  
      state.kind = 'scalar';
      state.result = '';
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
  
      while (ch !== 0) {
        if (ch === 0x3A/* : */) {
          following = state.input.charCodeAt(state.position + 1);
  
          if (is_WS_OR_EOL(following) ||
              withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
  
        } else if (ch === 0x23/* # */) {
          preceding = state.input.charCodeAt(state.position - 1);
  
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
  
        } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
                   withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
  
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
  
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
  
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
  
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
  
        ch = state.input.charCodeAt(++state.position);
      }
  
      captureSegment(state, captureStart, captureEnd, false);
  
      if (state.result) {
        return true;
      }
  
      state.kind = _kind;
      state.result = _result;
      return false;
    }
  
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch,
          captureStart, captureEnd;
  
      ch = state.input.charCodeAt(state.position);
  
      if (ch !== 0x27/* ' */) {
        return false;
      }
  
      state.kind = 'scalar';
      state.result = '';
      state.position++;
      captureStart = captureEnd = state.position;
  
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 0x27/* ' */) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
  
          if (ch === 0x27/* ' */) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
  
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
  
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, 'unexpected end of the document within a single quoted scalar');
  
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
  
      throwError(state, 'unexpected end of the stream within a single quoted scalar');
    }
  
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart,
          captureEnd,
          hexLength,
          hexResult,
          tmp,
          ch;
  
      ch = state.input.charCodeAt(state.position);
  
      if (ch !== 0x22/* " */) {
        return false;
      }
  
      state.kind = 'scalar';
      state.result = '';
      state.position++;
      captureStart = captureEnd = state.position;
  
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 0x22/* " */) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
  
        } else if (ch === 0x5C/* \ */) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
  
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
  
            // TODO: rework to inline fn with no type cast?
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
  
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
  
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
  
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
  
              } else {
                throwError(state, 'expected hexadecimal character');
              }
            }
  
            state.result += charFromCodepoint(hexResult);
  
            state.position++;
  
          } else {
            throwError(state, 'unknown escape sequence');
          }
  
          captureStart = captureEnd = state.position;
  
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
  
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, 'unexpected end of the document within a double quoted scalar');
  
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
  
      throwError(state, 'unexpected end of the stream within a double quoted scalar');
    }
  
    function readFlowCollection(state, nodeIndent) {
      var readNext = true,
          _line,
          _lineStart,
          _pos,
          _tag     = state.tag,
          _result,
          _anchor  = state.anchor,
          following,
          terminator,
          isPair,
          isExplicitPair,
          isMapping,
          overridableKeys = Object.create(null),
          keyNode,
          keyTag,
          valueNode,
          ch;
  
      ch = state.input.charCodeAt(state.position);
  
      if (ch === 0x5B/* [ */) {
        terminator = 0x5D;/* ] */
        isMapping = false;
        _result = [];
      } else if (ch === 0x7B/* { */) {
        terminator = 0x7D;/* } */
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
  
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
  
      ch = state.input.charCodeAt(++state.position);
  
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
  
        ch = state.input.charCodeAt(state.position);
  
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? 'mapping' : 'sequence';
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, 'missed comma between flow collection entries');
        } else if (ch === 0x2C/* , */) {
          // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
          throwError(state, "expected the node content, but found ','");
        }
  
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
  
        if (ch === 0x3F/* ? */) {
          following = state.input.charCodeAt(state.position + 1);
  
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
  
        _line = state.line; // Save the current line.
        _lineStart = state.lineStart;
        _pos = state.position;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
  
        ch = state.input.charCodeAt(state.position);
  
        if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
  
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
        } else {
          _result.push(keyNode);
        }
  
        skipSeparationSpace(state, true, nodeIndent);
  
        ch = state.input.charCodeAt(state.position);
  
        if (ch === 0x2C/* , */) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
  
      throwError(state, 'unexpected end of the stream within a flow collection');
    }
  
    function readBlockScalar(state, nodeIndent) {
      var captureStart,
          folding,
          chomping       = CHOMPING_CLIP,
          didReadContent = false,
          detectedIndent = false,
          textIndent     = nodeIndent,
          emptyLines     = 0,
          atMoreIndented = false,
          tmp,
          ch;
  
      ch = state.input.charCodeAt(state.position);
  
      if (ch === 0x7C/* | */) {
        folding = false;
      } else if (ch === 0x3E/* > */) {
        folding = true;
      } else {
        return false;
      }
  
      state.kind = 'scalar';
      state.result = '';
  
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
  
        if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
          if (CHOMPING_CLIP === chomping) {
            chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, 'repeat of a chomping mode identifier');
          }
  
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, 'repeat of an indentation width identifier');
          }
  
        } else {
          break;
        }
      }
  
      if (is_WHITE_SPACE(ch)) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (is_WHITE_SPACE(ch));
  
        if (ch === 0x23/* # */) {
          do { ch = state.input.charCodeAt(++state.position); }
          while (!is_EOL(ch) && (ch !== 0));
        }
      }
  
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
  
        ch = state.input.charCodeAt(state.position);
  
        while ((!detectedIndent || state.lineIndent < textIndent) &&
               (ch === 0x20/* Space */)) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
  
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
  
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
  
        // End of the scalar.
        if (state.lineIndent < textIndent) {
  
          // Perform the chomping.
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) { // i.e. only if the scalar is not empty.
              state.result += '\n';
            }
          }
  
          // Break this `while` cycle and go to the funciton's epilogue.
          break;
        }
  
        // Folded style: use fancy rules to handle line breaks.
        if (folding) {
  
          // Lines starting with white space characters (more-indented lines) are not folded.
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            // except for the first content line (cf. Example 8.1)
            state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
  
          // End of more-indented block.
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat('\n', emptyLines + 1);
  
          // Just one line break - perceive as the same line.
          } else if (emptyLines === 0) {
            if (didReadContent) { // i.e. only if we have already read some scalar content.
              state.result += ' ';
            }
  
          // Several line breaks - perceive as different lines.
          } else {
            state.result += common.repeat('\n', emptyLines);
          }
  
        // Literal style: just add exact number of line breaks between content lines.
        } else {
          // Keep all line breaks except the header line break.
          state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
        }
  
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
  
        while (!is_EOL(ch) && (ch !== 0)) {
          ch = state.input.charCodeAt(++state.position);
        }
  
        captureSegment(state, captureStart, state.position, false);
      }
  
      return true;
    }
  
    function readBlockSequence(state, nodeIndent) {
      var _line,
          _tag      = state.tag,
          _anchor   = state.anchor,
          _result   = [],
          following,
          detected  = false,
          ch;
  
      // there is a leading tab before this token, so it can't be a block sequence/mapping;
      // it can still be flow sequence/mapping or a scalar
      if (state.firstTabInLine !== -1) return false;
  
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
  
      ch = state.input.charCodeAt(state.position);
  
      while (ch !== 0) {
        if (state.firstTabInLine !== -1) {
          state.position = state.firstTabInLine;
          throwError(state, 'tab characters must not be used in indentation');
        }
  
        if (ch !== 0x2D/* - */) {
          break;
        }
  
        following = state.input.charCodeAt(state.position + 1);
  
        if (!is_WS_OR_EOL(following)) {
          break;
        }
  
        detected = true;
        state.position++;
  
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
  
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
  
        ch = state.input.charCodeAt(state.position);
  
        if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
          throwError(state, 'bad indentation of a sequence entry');
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
  
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'sequence';
        state.result = _result;
        return true;
      }
      return false;
    }
  
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following,
          allowCompact,
          _line,
          _keyLine,
          _keyLineStart,
          _keyPos,
          _tag          = state.tag,
          _anchor       = state.anchor,
          _result       = {},
          overridableKeys = Object.create(null),
          keyTag        = null,
          keyNode       = null,
          valueNode     = null,
          atExplicitKey = false,
          detected      = false,
          ch;
  
      // there is a leading tab before this token, so it can't be a block sequence/mapping;
      // it can still be flow sequence/mapping or a scalar
      if (state.firstTabInLine !== -1) return false;
  
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
  
      ch = state.input.charCodeAt(state.position);
  
      while (ch !== 0) {
        if (!atExplicitKey && state.firstTabInLine !== -1) {
          state.position = state.firstTabInLine;
          throwError(state, 'tab characters must not be used in indentation');
        }
  
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line; // Save the current line.
  
        //
        // Explicit notation case. There are two separate blocks:
        // first for the key (denoted by "?") and second for the value (denoted by ":")
        //
        if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {
  
          if (ch === 0x3F/* ? */) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
              keyTag = keyNode = valueNode = null;
            }
  
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
  
          } else if (atExplicitKey) {
            // i.e. 0x3A/* : */ === character after the explicit key.
            atExplicitKey = false;
            allowCompact = true;
  
          } else {
            throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
          }
  
          state.position += 1;
          ch = following;
  
        //
        // Implicit notation case. Flow-style node as the key first, then ":", and the value.
        //
        } else {
          _keyLine = state.line;
          _keyLineStart = state.lineStart;
          _keyPos = state.position;
  
          if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
            // Neither implicit nor explicit notation.
            // Reading is done. Go to the epilogue.
            break;
          }
  
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
  
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
  
            if (ch === 0x3A/* : */) {
              ch = state.input.charCodeAt(++state.position);
  
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
              }
  
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
                keyTag = keyNode = valueNode = null;
              }
  
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
  
            } else if (detected) {
              throwError(state, 'can not read an implicit mapping pair; a colon is missed');
  
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true; // Keep the result of `composeNode`.
            }
  
          } else if (detected) {
            throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
  
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true; // Keep the result of `composeNode`.
          }
        }
  
        //
        // Common reading code for both explicit and implicit notations.
        //
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (atExplicitKey) {
            _keyLine = state.line;
            _keyLineStart = state.lineStart;
            _keyPos = state.position;
          }
  
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
  
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
  
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
  
        if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
          throwError(state, 'bad indentation of a mapping entry');
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
  
      //
      // Epilogue.
      //
  
      // Special case: last mapping's node contains only the key in explicit notation.
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
      }
  
      // Expose the resulting mapping.
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'mapping';
        state.result = _result;
      }
  
      return detected;
    }
  
    function readTagProperty(state) {
      var _position,
          isVerbatim = false,
          isNamed    = false,
          tagHandle,
          tagName,
          ch;
  
      ch = state.input.charCodeAt(state.position);
  
      if (ch !== 0x21/* ! */) return false;
  
      if (state.tag !== null) {
        throwError(state, 'duplication of a tag property');
      }
  
      ch = state.input.charCodeAt(++state.position);
  
      if (ch === 0x3C/* < */) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
  
      } else if (ch === 0x21/* ! */) {
        isNamed = true;
        tagHandle = '!!';
        ch = state.input.charCodeAt(++state.position);
  
      } else {
        tagHandle = '!';
      }
  
      _position = state.position;
  
      if (isVerbatim) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (ch !== 0 && ch !== 0x3E/* > */);
  
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, 'unexpected end of the stream within a verbatim tag');
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
  
          if (ch === 0x21/* ! */) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
  
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, 'named tag handle cannot contain such characters');
              }
  
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, 'tag suffix cannot contain exclamation marks');
            }
          }
  
          ch = state.input.charCodeAt(++state.position);
        }
  
        tagName = state.input.slice(_position, state.position);
  
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, 'tag suffix cannot contain flow indicator characters');
        }
      }
  
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, 'tag name cannot contain such characters: ' + tagName);
      }
  
      try {
        tagName = decodeURIComponent(tagName);
      } catch (err) {
        throwError(state, 'tag name is malformed: ' + tagName);
      }
  
      if (isVerbatim) {
        state.tag = tagName;
  
      } else if (_hasOwnProperty$2.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
  
      } else if (tagHandle === '!') {
        state.tag = '!' + tagName;
  
      } else if (tagHandle === '!!') {
        state.tag = 'tag:yaml.org,2002:' + tagName;
  
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
  
      return true;
    }
  
    function readAnchorProperty(state) {
      var _position,
          ch;
  
      ch = state.input.charCodeAt(state.position);
  
      if (ch !== 0x26/* & */) return false;
  
      if (state.anchor !== null) {
        throwError(state, 'duplication of an anchor property');
      }
  
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
  
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
  
      if (state.position === _position) {
        throwError(state, 'name of an anchor node must contain at least one character');
      }
  
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
  
    function readAlias(state) {
      var _position, alias,
          ch;
  
      ch = state.input.charCodeAt(state.position);
  
      if (ch !== 0x2A/* * */) return false;
  
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
  
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
  
      if (state.position === _position) {
        throwError(state, 'name of an alias node must contain at least one character');
      }
  
      alias = state.input.slice(_position, state.position);
  
      if (!_hasOwnProperty$2.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
  
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
  
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles,
          allowBlockScalars,
          allowBlockCollections,
          indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
          atNewLine  = false,
          hasContent = false,
          typeIndex,
          typeQuantity,
          typeList,
          type,
          flowIndent,
          blockIndent;
  
      if (state.listener !== null) {
        state.listener('open', state);
      }
  
      state.tag    = null;
      state.anchor = null;
      state.kind   = null;
      state.result = null;
  
      allowBlockStyles = allowBlockScalars = allowBlockCollections =
        CONTEXT_BLOCK_OUT === nodeContext ||
        CONTEXT_BLOCK_IN  === nodeContext;
  
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
  
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
  
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
  
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
  
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
  
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
  
        blockIndent = state.position - state.lineStart;
  
        if (indentStatus === 1) {
          if (allowBlockCollections &&
              (readBlockSequence(state, blockIndent) ||
               readBlockMapping(state, blockIndent, flowIndent)) ||
              readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
                readSingleQuotedScalar(state, flowIndent) ||
                readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
  
            } else if (readAlias(state)) {
              hasContent = true;
  
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, 'alias node should not have any properties');
              }
  
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
  
              if (state.tag === null) {
                state.tag = '?';
              }
            }
  
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          // Special case: block sequences are allowed to have same indentation level as the parent.
          // http://www.yaml.org/spec/1.2/spec.html#id2799784
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
  
      if (state.tag === null) {
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
  
      } else if (state.tag === '?') {
        // Implicit resolving is not allowed for non-scalar types, and '?'
        // non-specific tag is only automatically assigned to plain scalars.
        //
        // We only need to check kind conformity in case user explicitly assigns '?'
        // tag, for example like this: "!<?> [0]"
        //
        if (state.result !== null && state.kind !== 'scalar') {
          throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
        }
  
        for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
          type = state.implicitTypes[typeIndex];
  
          if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
            state.result = type.construct(state.result);
            state.tag = type.tag;
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
            break;
          }
        }
      } else if (state.tag !== '!') {
        if (_hasOwnProperty$2.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
          type = state.typeMap[state.kind || 'fallback'][state.tag];
        } else {
          // looking for multi type
          type = null;
          typeList = state.typeMap.multi[state.kind || 'fallback'];
  
          for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
            if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
              type = typeList[typeIndex];
              break;
            }
          }
        }
  
        if (!type) {
          throwError(state, 'unknown tag !<' + state.tag + '>');
        }
  
        if (state.result !== null && type.kind !== state.kind) {
          throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
        }
  
        if (!type.resolve(state.result, state.tag)) { // `state.result` updated in resolver if matched
          throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
        } else {
          state.result = type.construct(state.result, state.tag);
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
        }
      }
  
      if (state.listener !== null) {
        state.listener('close', state);
      }
      return state.tag !== null ||  state.anchor !== null || hasContent;
    }
  
    function readDocument(state) {
      var documentStart = state.position,
          _position,
          directiveName,
          directiveArgs,
          hasDirectives = false,
          ch;
  
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = Object.create(null);
      state.anchorMap = Object.create(null);
  
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
  
        ch = state.input.charCodeAt(state.position);
  
        if (state.lineIndent > 0 || ch !== 0x25/* % */) {
          break;
        }
  
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
  
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
  
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
  
        if (directiveName.length < 1) {
          throwError(state, 'directive name must not be less than one character in length');
        }
  
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
  
          if (ch === 0x23/* # */) {
            do { ch = state.input.charCodeAt(++state.position); }
            while (ch !== 0 && !is_EOL(ch));
            break;
          }
  
          if (is_EOL(ch)) break;
  
          _position = state.position;
  
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
  
          directiveArgs.push(state.input.slice(_position, state.position));
        }
  
        if (ch !== 0) readLineBreak(state);
  
        if (_hasOwnProperty$2.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
  
      skipSeparationSpace(state, true, -1);
  
      if (state.lineIndent === 0 &&
          state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
          state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
          state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
  
      } else if (hasDirectives) {
        throwError(state, 'directives end mark is expected');
      }
  
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
  
      if (state.checkLineBreaks &&
          PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, 'non-ASCII line breaks are interpreted as content');
      }
  
      state.documents.push(state.result);
  
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
  
        if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
  
      if (state.position < (state.length - 1)) {
        throwError(state, 'end of the stream or a document separator is expected');
      } else {
        return;
      }
    }
  
  
    function loadDocuments(input, options) {
      input = String(input);
      options = options || {};
  
      if (input.length !== 0) {
  
        // Add tailing `\n` if not exists
        if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
            input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
          input += '\n';
        }
  
        // Strip BOM
        if (input.charCodeAt(0) === 0xFEFF) {
          input = input.slice(1);
        }
      }
  
      var state = new State(input, options);
  
      var nullpos = input.indexOf('\0');
  
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, 'null byte is not allowed in input');
      }
  
      // Use 0 as string terminator. That significantly simplifies bounds check.
      state.input += '\0';
  
      while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
        state.lineIndent += 1;
        state.position += 1;
      }
  
      while (state.position < (state.length - 1)) {
        readDocument(state);
      }
  
      return state.documents;
    }
  
  
    function loadAll(input, iterator, options) {
      if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
        options = iterator;
        iterator = null;
      }
  
      var documents = loadDocuments(input, options);
  
      if (typeof iterator !== 'function') {
        return documents;
      }
  
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
  
  
    function load(input, options) {
      var documents = loadDocuments(input, options);
  
      if (documents.length === 0) {
        /*eslint-disable no-undefined*/
        return undefined;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new exception('expected a single document in the stream, but found more');
    }
  
  
    var loadAll_1 = loadAll;
    var load_1    = load;
  
    var loader = {
        loadAll: loadAll_1,
        load: load_1
    };
  
    /*eslint-disable no-use-before-define*/
  
  
  
  
  
    var _toString$2       = Object.prototype.toString;
    var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
  
    var CHAR_BOM                  = 0xFEFF;
    var CHAR_TAB                  = 0x09; /* Tab */
    var CHAR_LINE_FEED            = 0x0A; /* LF */
    var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
    var CHAR_SPACE                = 0x20; /* Space */
    var CHAR_EXCLAMATION          = 0x21; /* ! */
    var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
    var CHAR_SHARP                = 0x23; /* # */
    var CHAR_PERCENT              = 0x25; /* % */
    var CHAR_AMPERSAND            = 0x26; /* & */
    var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
    var CHAR_ASTERISK             = 0x2A; /* * */
    var CHAR_COMMA                = 0x2C; /* , */
    var CHAR_MINUS                = 0x2D; /* - */
    var CHAR_COLON                = 0x3A; /* : */
    var CHAR_EQUALS               = 0x3D; /* = */
    var CHAR_GREATER_THAN         = 0x3E; /* > */
    var CHAR_QUESTION             = 0x3F; /* ? */
    var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
    var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
    var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
    var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
    var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
    var CHAR_VERTICAL_LINE        = 0x7C; /* | */
    var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */
  
    var ESCAPE_SEQUENCES = {};
  
    ESCAPE_SEQUENCES[0x00]   = '\\0';
    ESCAPE_SEQUENCES[0x07]   = '\\a';
    ESCAPE_SEQUENCES[0x08]   = '\\b';
    ESCAPE_SEQUENCES[0x09]   = '\\t';
    ESCAPE_SEQUENCES[0x0A]   = '\\n';
    ESCAPE_SEQUENCES[0x0B]   = '\\v';
    ESCAPE_SEQUENCES[0x0C]   = '\\f';
    ESCAPE_SEQUENCES[0x0D]   = '\\r';
    ESCAPE_SEQUENCES[0x1B]   = '\\e';
    ESCAPE_SEQUENCES[0x22]   = '\\"';
    ESCAPE_SEQUENCES[0x5C]   = '\\\\';
    ESCAPE_SEQUENCES[0x85]   = '\\N';
    ESCAPE_SEQUENCES[0xA0]   = '\\_';
    ESCAPE_SEQUENCES[0x2028] = '\\L';
    ESCAPE_SEQUENCES[0x2029] = '\\P';
  
    var DEPRECATED_BOOLEANS_SYNTAX = [
      'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
      'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
    ];
  
    var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  
    function compileStyleMap(schema, map) {
      var result, keys, index, length, tag, style, type;
  
      if (map === null) return {};
  
      result = {};
      keys = Object.keys(map);
  
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
  
        if (tag.slice(0, 2) === '!!') {
          tag = 'tag:yaml.org,2002:' + tag.slice(2);
        }
        type = schema.compiledTypeMap['fallback'][tag];
  
        if (type && _hasOwnProperty$3.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
  
        result[tag] = style;
      }
  
      return result;
    }
  
    function encodeHex(character) {
      var string, handle, length;
  
      string = character.toString(16).toUpperCase();
  
      if (character <= 0xFF) {
        handle = 'x';
        length = 2;
      } else if (character <= 0xFFFF) {
        handle = 'u';
        length = 4;
      } else if (character <= 0xFFFFFFFF) {
        handle = 'U';
        length = 8;
      } else {
        throw new exception('code point within a string may not be greater than 0xFFFFFFFF');
      }
  
      return '\\' + handle + common.repeat('0', length - string.length) + string;
    }
  
  
    var QUOTING_TYPE_SINGLE = 1,
        QUOTING_TYPE_DOUBLE = 2;
  
    function State$1(options) {
      this.schema        = options['schema'] || _default;
      this.indent        = Math.max(1, (options['indent'] || 2));
      this.noArrayIndent = options['noArrayIndent'] || false;
      this.skipInvalid   = options['skipInvalid'] || false;
      this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
      this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
      this.sortKeys      = options['sortKeys'] || false;
      this.lineWidth     = options['lineWidth'] || 80;
      this.noRefs        = options['noRefs'] || false;
      this.noCompatMode  = options['noCompatMode'] || false;
      this.condenseFlow  = options['condenseFlow'] || false;
      this.quotingType   = options['quotingType'] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
      this.forceQuotes   = options['forceQuotes'] || false;
      this.replacer      = typeof options['replacer'] === 'function' ? options['replacer'] : null;
  
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
  
      this.tag = null;
      this.result = '';
  
      this.duplicates = [];
      this.usedDuplicates = null;
    }
  
    // Indents every line in a string. Empty lines (\n only) are not indented.
    function indentString(string, spaces) {
      var ind = common.repeat(' ', spaces),
          position = 0,
          next = -1,
          result = '',
          line,
          length = string.length;
  
      while (position < length) {
        next = string.indexOf('\n', position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
  
        if (line.length && line !== '\n') result += ind;
  
        result += line;
      }
  
      return result;
    }
  
    function generateNextLine(state, level) {
      return '\n' + common.repeat(' ', state.indent * level);
    }
  
    function testImplicitResolving(state, str) {
      var index, length, type;
  
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
  
        if (type.resolve(str)) {
          return true;
        }
      }
  
      return false;
    }
  
    // [33] s-white ::= s-space | s-tab
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
  
    // Returns true if the character can be printed without escaping.
    // From YAML 1.2: "any allowed characters known to be non-printable
    // should also be escaped. [However,] This isn’t mandatory"
    // Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
    function isPrintable(c) {
      return  (0x00020 <= c && c <= 0x00007E)
          || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
          || ((0x0E000 <= c && c <= 0x00FFFD) && c !== CHAR_BOM)
          ||  (0x10000 <= c && c <= 0x10FFFF);
    }
  
    // [34] ns-char ::= nb-char - s-white
    // [27] nb-char ::= c-printable - b-char - c-byte-order-mark
    // [26] b-char  ::= b-line-feed | b-carriage-return
    // Including s-white (for some reason, examples doesn't match specs in this aspect)
    // ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
    function isNsCharOrWhitespace(c) {
      return isPrintable(c)
        && c !== CHAR_BOM
        // - b-char
        && c !== CHAR_CARRIAGE_RETURN
        && c !== CHAR_LINE_FEED;
    }
  
    // [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
    //                             c = flow-in   ⇒ ns-plain-safe-in
    //                             c = block-key ⇒ ns-plain-safe-out
    //                             c = flow-key  ⇒ ns-plain-safe-in
    // [128] ns-plain-safe-out ::= ns-char
    // [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
    // [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
    //                            | ( /* An ns-char preceding */ “#” )
    //                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
    function isPlainSafe(c, prev, inblock) {
      var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
      var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
      return (
        // ns-plain-safe
        inblock ? // c = flow-in
          cIsNsCharOrWhitespace
          : cIsNsCharOrWhitespace
            // - c-flow-indicator
            && c !== CHAR_COMMA
            && c !== CHAR_LEFT_SQUARE_BRACKET
            && c !== CHAR_RIGHT_SQUARE_BRACKET
            && c !== CHAR_LEFT_CURLY_BRACKET
            && c !== CHAR_RIGHT_CURLY_BRACKET
      )
        // ns-plain-char
        && c !== CHAR_SHARP // false on '#'
        && !(prev === CHAR_COLON && !cIsNsChar) // false on ': '
        || (isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP) // change to true on '[^ ]#'
        || (prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
    }
  
    // Simplified test for values allowed as the first character in plain style.
    function isPlainSafeFirst(c) {
      // Uses a subset of ns-char - c-indicator
      // where ns-char = nb-char - s-white.
      // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
      return isPrintable(c) && c !== CHAR_BOM
        && !isWhitespace(c) // - s-white
        // - (c-indicator ::=
        // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
        && c !== CHAR_MINUS
        && c !== CHAR_QUESTION
        && c !== CHAR_COLON
        && c !== CHAR_COMMA
        && c !== CHAR_LEFT_SQUARE_BRACKET
        && c !== CHAR_RIGHT_SQUARE_BRACKET
        && c !== CHAR_LEFT_CURLY_BRACKET
        && c !== CHAR_RIGHT_CURLY_BRACKET
        // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
        && c !== CHAR_SHARP
        && c !== CHAR_AMPERSAND
        && c !== CHAR_ASTERISK
        && c !== CHAR_EXCLAMATION
        && c !== CHAR_VERTICAL_LINE
        && c !== CHAR_EQUALS
        && c !== CHAR_GREATER_THAN
        && c !== CHAR_SINGLE_QUOTE
        && c !== CHAR_DOUBLE_QUOTE
        // | “%” | “@” | “`”)
        && c !== CHAR_PERCENT
        && c !== CHAR_COMMERCIAL_AT
        && c !== CHAR_GRAVE_ACCENT;
    }
  
    // Simplified test for values allowed as the last character in plain style.
    function isPlainSafeLast(c) {
      // just not whitespace or colon, it will be checked to be plain character later
      return !isWhitespace(c) && c !== CHAR_COLON;
    }
  
    // Same as 'string'.codePointAt(pos), but works in older browsers.
    function codePointAt(string, pos) {
      var first = string.charCodeAt(pos), second;
      if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
        second = string.charCodeAt(pos + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
          // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
          return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
      }
      return first;
    }
  
    // Determines whether block indentation indicator is required.
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
  
    var STYLE_PLAIN   = 1,
        STYLE_SINGLE  = 2,
        STYLE_LITERAL = 3,
        STYLE_FOLDED  = 4,
        STYLE_DOUBLE  = 5;
  
    // Determines which scalar styles are possible and returns the preferred style.
    // lineWidth = -1 => no limit.
    // Pre-conditions: str.length > 0.
    // Post-conditions:
    //    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
    //    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
    //    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth,
      testAmbiguousType, quotingType, forceQuotes, inblock) {
  
      var i;
      var char = 0;
      var prevChar = null;
      var hasLineBreak = false;
      var hasFoldableLine = false; // only checked if shouldTrackWidth
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1; // count the first line correctly
      var plain = isPlainSafeFirst(codePointAt(string, 0))
              && isPlainSafeLast(codePointAt(string, string.length - 1));
  
      if (singleLineOnly || forceQuotes) {
        // Case: no block styles.
        // Check for disallowed characters to rule out plain and single.
        for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
          char = codePointAt(string, i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          plain = plain && isPlainSafe(char, prevChar, inblock);
          prevChar = char;
        }
      } else {
        // Case: block styles permitted.
        for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
          char = codePointAt(string, i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            // Check if any line can be folded.
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine ||
                // Foldable line = too long, and not more-indented.
                (i - previousLineBreak - 1 > lineWidth &&
                 string[previousLineBreak + 1] !== ' ');
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          plain = plain && isPlainSafe(char, prevChar, inblock);
          prevChar = char;
        }
        // in case the end is missing a \n
        hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
          (i - previousLineBreak - 1 > lineWidth &&
           string[previousLineBreak + 1] !== ' '));
      }
      // Although every style can represent \n without escaping, prefer block styles
      // for multiline, since they're more readable and they don't add empty lines.
      // Also prefer folding a super-long line.
      if (!hasLineBreak && !hasFoldableLine) {
        // Strings interpretable as another type have to be quoted;
        // e.g. the string 'true' vs. the boolean true.
        if (plain && !forceQuotes && !testAmbiguousType(string)) {
          return STYLE_PLAIN;
        }
        return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
      }
      // Edge case: block indentation indicator can only have one digit.
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      // At this point we know block styles are valid.
      // Prefer literal style unless we want to fold.
      if (!forceQuotes) {
        return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
  
    // Note: line breaking/folding is implemented for only the folded style.
    // NB. We drop the last trailing newline (if any) of a returned block scalar
    //  since the dumper adds its own newline. This always works:
    //    • No ending newline => unaffected; already using strip "-" chomping.
    //    • Ending newline    => removed then restored.
    //  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
    function writeScalar(state, string, level, iskey, inblock) {
      state.dump = (function () {
        if (string.length === 0) {
          return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
        }
        if (!state.noCompatMode) {
          if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
            return state.quotingType === QUOTING_TYPE_DOUBLE ? ('"' + string + '"') : ("'" + string + "'");
          }
        }
  
        var indent = state.indent * Math.max(1, level); // no 0-indent scalars
        // As indentation gets deeper, let the width decrease monotonically
        // to the lower bound min(state.lineWidth, 40).
        // Note that this implies
        //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
        //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
        // This behaves better than a constant minimum width which disallows narrower options,
        // or an indent threshold which causes the width to suddenly increase.
        var lineWidth = state.lineWidth === -1
          ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
  
        // Without knowing if keys are implicit/explicit, assume implicit for safety.
        var singleLineOnly = iskey
          // No block styles in flow mode.
          || (state.flowLevel > -1 && level >= state.flowLevel);
        function testAmbiguity(string) {
          return testImplicitResolving(state, string);
        }
  
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth,
          testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {
  
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return '|' + blockHeader(string, state.indent)
              + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return '>' + blockHeader(string, state.indent)
              + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string) + '"';
          default:
            throw new exception('impossible error: invalid scalar style');
        }
      }());
    }
  
    // Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';
  
      // note the special case: the string '\n' counts as a "trailing" empty line.
      var clip =          string[string.length - 1] === '\n';
      var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
      var chomp = keep ? '+' : (clip ? '' : '-');
  
      return indentIndicator + chomp + '\n';
    }
  
    // (See the note for writeScalar.)
    function dropEndingNewline(string) {
      return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
    }
  
    // Note: a long line without a suitable break point will exceed the width limit.
    // Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
    function foldString(string, width) {
      // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
      // unless they're before or after a more-indented line, or at the very
      // beginning or end, in which case $k$ maps to $k$.
      // Therefore, parse each chunk as newline(s) followed by a content line.
      var lineRe = /(\n+)([^\n]*)/g;
  
      // first line (possibly an empty line)
      var result = (function () {
        var nextLF = string.indexOf('\n');
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      }());
      // If we haven't reached the first content line yet, don't add an extra \n.
      var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
      var moreIndented;
  
      // rest of the lines
      var match;
      while ((match = lineRe.exec(string))) {
        var prefix = match[1], line = match[2];
        moreIndented = (line[0] === ' ');
        result += prefix
          + (!prevMoreIndented && !moreIndented && line !== ''
            ? '\n' : '')
          + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
  
      return result;
    }
  
    // Greedy line breaking.
    // Picks the longest line under the limit each time,
    // otherwise settles for the shortest line over the limit.
    // NB. More-indented lines *cannot* be folded, as that would add an extra \n.
    function foldLine(line, width) {
      if (line === '' || line[0] === ' ') return line;
  
      // Since a more-indented line adds a \n, breaks can't be followed by a space.
      var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
      var match;
      // start is an inclusive index. end, curr, and next are exclusive.
      var start = 0, end, curr = 0, next = 0;
      var result = '';
  
      // Invariants: 0 <= start <= length-1.
      //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
      // Inside the loop:
      //   A match implies length >= 2, so curr and next are <= length-2.
      while ((match = breakRe.exec(line))) {
        next = match.index;
        // maintain invariant: curr - start <= width
        if (next - start > width) {
          end = (curr > start) ? curr : next; // derive end <= length-2
          result += '\n' + line.slice(start, end);
          // skip the space that was output as \n
          start = end + 1;                    // derive start <= length-1
        }
        curr = next;
      }
  
      // By the invariants, start <= length-1, so there is something left over.
      // It is either the whole string or a part starting from non-whitespace.
      result += '\n';
      // Insert a break if the remainder is too long and there is a break available.
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
  
      return result.slice(1); // drop extra \n joiner
    }
  
    // Escapes a double-quoted string.
    function escapeString(string) {
      var result = '';
      var char = 0;
      var escapeSeq;
  
      for (var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
        char = codePointAt(string, i);
        escapeSeq = ESCAPE_SEQUENCES[char];
  
        if (!escapeSeq && isPrintable(char)) {
          result += string[i];
          if (char >= 0x10000) result += string[i + 1];
        } else {
          result += escapeSeq || encodeHex(char);
        }
      }
  
      return result;
    }
  
    function writeFlowSequence(state, level, object) {
      var _result = '',
          _tag    = state.tag,
          index,
          length,
          value;
  
      for (index = 0, length = object.length; index < length; index += 1) {
        value = object[index];
  
        if (state.replacer) {
          value = state.replacer.call(object, String(index), value);
        }
  
        // Write only valid elements, put null instead of invalid elements.
        if (writeNode(state, level, value, false, false) ||
            (typeof value === 'undefined' &&
             writeNode(state, level, null, false, false))) {
  
          if (_result !== '') _result += ',' + (!state.condenseFlow ? ' ' : '');
          _result += state.dump;
        }
      }
  
      state.tag = _tag;
      state.dump = '[' + _result + ']';
    }
  
    function writeBlockSequence(state, level, object, compact) {
      var _result = '',
          _tag    = state.tag,
          index,
          length,
          value;
  
      for (index = 0, length = object.length; index < length; index += 1) {
        value = object[index];
  
        if (state.replacer) {
          value = state.replacer.call(object, String(index), value);
        }
  
        // Write only valid elements, put null instead of invalid elements.
        if (writeNode(state, level + 1, value, true, true, false, true) ||
            (typeof value === 'undefined' &&
             writeNode(state, level + 1, null, true, true, false, true))) {
  
          if (!compact || _result !== '') {
            _result += generateNextLine(state, level);
          }
  
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += '-';
          } else {
            _result += '- ';
          }
  
          _result += state.dump;
        }
      }
  
      state.tag = _tag;
      state.dump = _result || '[]'; // Empty sequence if no valid values.
    }
  
    function writeFlowMapping(state, level, object) {
      var _result       = '',
          _tag          = state.tag,
          objectKeyList = Object.keys(object),
          index,
          length,
          objectKey,
          objectValue,
          pairBuffer;
  
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
  
        pairBuffer = '';
        if (_result !== '') pairBuffer += ', ';
  
        if (state.condenseFlow) pairBuffer += '"';
  
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
  
        if (state.replacer) {
          objectValue = state.replacer.call(object, objectKey, objectValue);
        }
  
        if (!writeNode(state, level, objectKey, false, false)) {
          continue; // Skip this pair because of invalid key;
        }
  
        if (state.dump.length > 1024) pairBuffer += '? ';
  
        pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');
  
        if (!writeNode(state, level, objectValue, false, false)) {
          continue; // Skip this pair because of invalid value.
        }
  
        pairBuffer += state.dump;
  
        // Both key and value are valid.
        _result += pairBuffer;
      }
  
      state.tag = _tag;
      state.dump = '{' + _result + '}';
    }
  
    function writeBlockMapping(state, level, object, compact) {
      var _result       = '',
          _tag          = state.tag,
          objectKeyList = Object.keys(object),
          index,
          length,
          objectKey,
          objectValue,
          explicitPair,
          pairBuffer;
  
      // Allow sorting keys so that the output file is deterministic
      if (state.sortKeys === true) {
        // Default sorting
        objectKeyList.sort();
      } else if (typeof state.sortKeys === 'function') {
        // Custom sort function
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        // Something is wrong
        throw new exception('sortKeys must be a boolean or a function');
      }
  
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = '';
  
        if (!compact || _result !== '') {
          pairBuffer += generateNextLine(state, level);
        }
  
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
  
        if (state.replacer) {
          objectValue = state.replacer.call(object, objectKey, objectValue);
        }
  
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue; // Skip this pair because of invalid key.
        }
  
        explicitPair = (state.tag !== null && state.tag !== '?') ||
                       (state.dump && state.dump.length > 1024);
  
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += '?';
          } else {
            pairBuffer += '? ';
          }
        }
  
        pairBuffer += state.dump;
  
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
  
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue; // Skip this pair because of invalid value.
        }
  
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ':';
        } else {
          pairBuffer += ': ';
        }
  
        pairBuffer += state.dump;
  
        // Both key and value are valid.
        _result += pairBuffer;
      }
  
      state.tag = _tag;
      state.dump = _result || '{}'; // Empty mapping if no valid pairs.
    }
  
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type, style;
  
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
  
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
  
        if ((type.instanceOf  || type.predicate) &&
            (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
            (!type.predicate  || type.predicate(object))) {
  
          if (explicit) {
            if (type.multi && type.representName) {
              state.tag = type.representName(object);
            } else {
              state.tag = type.tag;
            }
          } else {
            state.tag = '?';
          }
  
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
  
            if (_toString$2.call(type.represent) === '[object Function]') {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty$3.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new exception('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
  
            state.dump = _result;
          }
  
          return true;
        }
      }
  
      return false;
    }
  
    // Serializes `object` and writes it to global `result`.
    // Returns true on success, or false on invalid object.
    //
    function writeNode(state, level, object, block, compact, iskey, isblockseq) {
      state.tag = null;
      state.dump = object;
  
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
  
      var type = _toString$2.call(state.dump);
      var inblock = block;
      var tagStr;
  
      if (block) {
        block = (state.flowLevel < 0 || state.flowLevel > level);
      }
  
      var objectOrArray = type === '[object Object]' || type === '[object Array]',
          duplicateIndex,
          duplicate;
  
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
  
      if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
        compact = false;
      }
  
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = '*ref_' + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === '[object Object]') {
          if (block && (Object.keys(state.dump).length !== 0)) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = '&ref_' + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
            }
          }
        } else if (type === '[object Array]') {
          if (block && (state.dump.length !== 0)) {
            if (state.noArrayIndent && !isblockseq && level > 0) {
              writeBlockSequence(state, level - 1, state.dump, compact);
            } else {
              writeBlockSequence(state, level, state.dump, compact);
            }
            if (duplicate) {
              state.dump = '&ref_' + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, level, state.dump);
            if (duplicate) {
              state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
            }
          }
        } else if (type === '[object String]') {
          if (state.tag !== '?') {
            writeScalar(state, state.dump, level, iskey, inblock);
          }
        } else if (type === '[object Undefined]') {
          return false;
        } else {
          if (state.skipInvalid) return false;
          throw new exception('unacceptable kind of an object to dump ' + type);
        }
  
        if (state.tag !== null && state.tag !== '?') {
          // Need to encode all characters except those allowed by the spec:
          //
          // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
          // [36] ns-hex-digit    ::=  ns-dec-digit
          //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
          // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
          // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
          // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
          //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
          //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
          //
          // Also need to encode '!' because it has special meaning (end of tag prefix).
          //
          tagStr = encodeURI(
            state.tag[0] === '!' ? state.tag.slice(1) : state.tag
          ).replace(/!/g, '%21');
  
          if (state.tag[0] === '!') {
            tagStr = '!' + tagStr;
          } else if (tagStr.slice(0, 18) === 'tag:yaml.org,2002:') {
            tagStr = '!!' + tagStr.slice(18);
          } else {
            tagStr = '!<' + tagStr + '>';
          }
  
          state.dump = tagStr + ' ' + state.dump;
        }
      }
  
      return true;
    }
  
    function getDuplicateReferences(object, state) {
      var objects = [],
          duplicatesIndexes = [],
          index,
          length;
  
      inspectNode(object, objects, duplicatesIndexes);
  
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
  
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList,
          index,
          length;
  
      if (object !== null && typeof object === 'object') {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
  
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
  
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
  
    function dump(input, options) {
      options = options || {};
  
      var state = new State$1(options);
  
      if (!state.noRefs) getDuplicateReferences(input, state);
  
      var value = input;
  
      if (state.replacer) {
        value = state.replacer.call({ '': value }, '', value);
      }
  
      if (writeNode(state, 0, value, true, true)) return state.dump + '\n';
  
      return '';
    }
  
    var dump_1 = dump;
  
    var dumper = {
        dump: dump_1
    };
  
    function renamed(from, to) {
      return function () {
        throw new Error('Function yaml.' + from + ' is removed in js-yaml 4. ' +
          'Use yaml.' + to + ' instead, which is now safe by default.');
      };
    }
  
  
    var Type$1                = type;
    var Schema$1              = schema;
    var FAILSAFE_SCHEMA     = failsafe;
    var JSON_SCHEMA         = json;
    var CORE_SCHEMA         = core;
    var DEFAULT_SCHEMA      = _default;
    var load$1                = loader.load;
    var loadAll$1             = loader.loadAll;
    var dump$1                = dumper.dump;
    var YAMLException$1       = exception;
  
    // Removed functions from JS-YAML 3.0.x
    var safeLoad            = renamed('safeLoad', 'load');
    var safeLoadAll         = renamed('safeLoadAll', 'loadAll');
    var safeDump            = renamed('safeDump', 'dump');
  
    var jsYaml = {
        Type: Type$1,
        Schema: Schema$1,
        FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
        JSON_SCHEMA: JSON_SCHEMA,
        CORE_SCHEMA: CORE_SCHEMA,
        DEFAULT_SCHEMA: DEFAULT_SCHEMA,
        load: load$1,
        loadAll: loadAll$1,
        dump: dump$1,
        YAMLException: YAMLException$1,
        safeLoad: safeLoad,
        safeLoadAll: safeLoadAll,
        safeDump: safeDump
    };
  
    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  
    function getAugmentedNamespace(n) {
        if (n.__esModule) return n;
        var a = Object.defineProperty({}, '__esModule', {value: true});
        Object.keys(n).forEach(function (k) {
            var d = Object.getOwnPropertyDescriptor(n, k);
            Object.defineProperty(a, k, d.get ? d : {
                enumerable: true,
                get: function () {
                    return n[k];
                }
            });
        });
        return a;
    }
  
    function createCommonjsModule(fn) {
      var module = { exports: {} };
        return fn(module, module.exports), module.exports;
    }
  
       
    function noop() {}
  
    var logger   = { warn: noop, error: noop },
        padding  = '=',
        chrTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
                   '0123456789+/',
        binTable = [
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
          52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1,  0, -1, -1,
          -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
          15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
          -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
        ];
  
    if (window.console) {
      logger = window.console;
      logger.warn = logger.warn || logger.error || logger.log || noop;
      logger.error = logger.error || logger.warn || logger.log || noop;
    }
  
    // internal helpers //////////////////////////////////////////////////////////
  
    function utf8Encode(str) {
      var bytes = [], offset = 0, length, char;
  
      str = encodeURI(str);
      length = str.length;
  
      while (offset < length) {
        char = str.charAt(offset);
        offset += 1;
  
        if (char !== '%') {
          bytes.push(char.charCodeAt(0));
        } else {
          char = str.charAt(offset) + str.charAt(offset + 1);
          bytes.push(parseInt(char, 16));
          offset += 2;
        }
      }
  
      return bytes;
    }
  
    function utf8Decode(bytes) {
      var chars = [], offset = 0, length = bytes.length, c1, c2, c3;
  
      while (offset < length) {
        c1 = bytes[offset];
        c2 = bytes[offset + 1];
        c3 = bytes[offset + 2];
  
        if (c1 < 128) {
          chars.push(String.fromCharCode(c1));
          offset += 1;
        } else if (191 < c1 && c1 < 224) {
          chars.push(String.fromCharCode(((c1 & 31) << 6) | (c2 & 63)));
          offset += 2;
        } else {
          chars.push(String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
          offset += 3;
        }
      }
  
      return chars.join('');
    }
  
    // public api ////////////////////////////////////////////////////////////////
  
    function encode(str) {
      var result = '',
          bytes = utf8Encode(str),
          length = bytes.length,
          i;
  
      // Convert every three bytes to 4 ascii characters.
      for (i = 0; i < (length - 2); i += 3) {
        result += chrTable[bytes[i] >> 2];
        result += chrTable[((bytes[i] & 0x03) << 4) + (bytes[i + 1] >> 4)];
        result += chrTable[((bytes[i + 1] & 0x0f) << 2) + (bytes[i + 2] >> 6)];
        result += chrTable[bytes[i + 2] & 0x3f];
      }
  
      // Convert the remaining 1 or 2 bytes, pad out to 4 characters.
      if (length % 3) {
        i = length - (length % 3);
        result += chrTable[bytes[i] >> 2];
        if ((length % 3) === 2) {
          result += chrTable[((bytes[i] & 0x03) << 4) + (bytes[i + 1] >> 4)];
          result += chrTable[(bytes[i + 1] & 0x0f) << 2];
          result += padding;
        } else {
          result += chrTable[(bytes[i] & 0x03) << 4];
          result += padding + padding;
        }
      }
  
      return result;
    }
  
    function decode(data) {
      var value, code, idx = 0,
          bytes = [],
          leftbits = 0, // number of bits decoded, but yet to be appended
          leftdata = 0; // bits decoded, but yet to be appended
  
      // Convert one by one.
      for (idx = 0; idx < data.length; idx += 1) {
        code = data.charCodeAt(idx);
        value = binTable[code & 0x7F];
  
        if (value === -1) {
          // Skip illegal characters and whitespace
          logger.warn('Illegal characters (code=' + code + ') in position ' + idx);
        } else {
          // Collect data into leftdata, update bitcount
          leftdata = (leftdata << 6) | value;
          leftbits += 6;
  
          // If we have 8 or more bits, append 8 bits to the result
          if (leftbits >= 8) {
            leftbits -= 8;
            // Append if not padding.
            if (padding !== data.charAt(idx)) {
              bytes.push((leftdata >> leftbits) & 0xFF);
            }
            leftdata &= (1 << leftbits) - 1;
          }
        }
      }
  
      // If there are any bits left, the base64 string was corrupted
      if (leftbits) {
        logger.error('Corrupted base64 string');
        return null;
      }
  
      return utf8Decode(bytes);
    }
  
    var encode_1 = encode;
    var decode_1 = decode;
  
    var base64 = {
        encode: encode_1,
        decode: decode_1
    };
  
    var global$1 = (typeof global !== "undefined" ? global :
      typeof self !== "undefined" ? self :
      typeof window !== "undefined" ? window : {});
  
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    var inited = false;
    function init () {
      inited = true;
      var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
  
      revLookup['-'.charCodeAt(0)] = 62;
      revLookup['_'.charCodeAt(0)] = 63;
    }
  
    function toByteArray (b64) {
      if (!inited) {
        init();
      }
      var i, j, l, tmp, placeHolders, arr;
      var len = b64.length;
  
      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4')
      }
  
      // the number of equal signs (place holders)
      // if there are two placeholders, than the two characters before it
      // represent one byte
      // if there is only one, then the three characters before it represent 2 bytes
      // this is just a cheap hack to not do indexOf twice
      placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
  
      // base64 is 4/3 + up to two characters of the original data
      arr = new Arr(len * 3 / 4 - placeHolders);
  
      // if there are placeholders, only get up to the last complete 4 chars
      l = placeHolders > 0 ? len - 4 : len;
  
      var L = 0;
  
      for (i = 0, j = 0; i < l; i += 4, j += 3) {
        tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
        arr[L++] = (tmp >> 16) & 0xFF;
        arr[L++] = (tmp >> 8) & 0xFF;
        arr[L++] = tmp & 0xFF;
      }
  
      if (placeHolders === 2) {
        tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
        arr[L++] = tmp & 0xFF;
      } else if (placeHolders === 1) {
        tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
        arr[L++] = (tmp >> 8) & 0xFF;
        arr[L++] = tmp & 0xFF;
      }
  
      return arr
    }
  
    function tripletToBase64 (num) {
      return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
    }
  
    function encodeChunk (uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
        output.push(tripletToBase64(tmp));
      }
      return output.join('')
    }
  
    function fromByteArray (uint8) {
      if (!inited) {
        init();
      }
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
      var output = '';
      var parts = [];
      var maxChunkLength = 16383; // must be multiple of 3
  
      // go through the array every three bytes, we'll deal with trailing stuff later
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
      }
  
      // pad the end with zeros, but make sure to not forget the extra bytes
      if (extraBytes === 1) {
        tmp = uint8[len - 1];
        output += lookup[tmp >> 2];
        output += lookup[(tmp << 4) & 0x3F];
        output += '==';
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
        output += lookup[tmp >> 10];
        output += lookup[(tmp >> 4) & 0x3F];
        output += lookup[(tmp << 2) & 0x3F];
        output += '=';
      }
  
      parts.push(output);
  
      return parts.join('')
    }
  
    function read (buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? (nBytes - 1) : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
  
      i += d;
  
      e = s & ((1 << (-nBits)) - 1);
      s >>= (-nBits);
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
  
      m = e & ((1 << (-nBits)) - 1);
      e >>= (-nBits);
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
  
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : ((s ? -1 : 1) * Infinity)
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
    }
  
    function write (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
      var i = isLE ? 0 : (nBytes - 1);
      var d = isLE ? 1 : -1;
      var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
  
      value = Math.abs(value);
  
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
  
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
  
      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
  
      e = (e << mLen) | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
  
      buffer[offset + i - d] |= s * 128;
    }
  
    var toString = {}.toString;
  
    var isArray = Array.isArray || function (arr) {
      return toString.call(arr) == '[object Array]';
    };
  
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
     * @license  MIT
     */
  
    var INSPECT_MAX_BYTES = 50;
  
    /**
     * If `Buffer.TYPED_ARRAY_SUPPORT`:
     *   === true    Use Uint8Array implementation (fastest)
     *   === false   Use Object implementation (most compatible, even IE6)
     *
     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
     * Opera 11.6+, iOS 4.2+.
     *
     * Due to various browser bugs, sometimes the Object implementation will be used even
     * when the browser supports typed arrays.
     *
     * Note:
     *
     *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
     *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
     *
     *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
     *
     *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
     *     incorrect length in some situations.
  
     * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
     * get the Object implementation, which is slower but behaves correctly.
     */
    Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
      ? global$1.TYPED_ARRAY_SUPPORT
      : true;
  
    function kMaxLength () {
      return Buffer.TYPED_ARRAY_SUPPORT
        ? 0x7fffffff
        : 0x3fffffff
    }
  
    function createBuffer (that, length) {
      if (kMaxLength() < length) {
        throw new RangeError('Invalid typed array length')
      }
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        // Return an augmented `Uint8Array` instance, for best performance
        that = new Uint8Array(length);
        that.__proto__ = Buffer.prototype;
      } else {
        // Fallback: Return an object instance of the Buffer class
        if (that === null) {
          that = new Buffer(length);
        }
        that.length = length;
      }
  
      return that
    }
  
    /**
     * The Buffer constructor returns instances of `Uint8Array` that have their
     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
     * returns a single octet.
     *
     * The `Uint8Array` prototype remains unmodified.
     */
  
    function Buffer (arg, encodingOrOffset, length) {
      if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
        return new Buffer(arg, encodingOrOffset, length)
      }
  
      // Common case.
      if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
          throw new Error(
            'If encoding is specified then the first argument must be a string'
          )
        }
        return allocUnsafe(this, arg)
      }
      return from(this, arg, encodingOrOffset, length)
    }
  
    Buffer.poolSize = 8192; // not used by this implementation
  
    // TODO: Legacy, not needed anymore. Remove in next major version.
    Buffer._augment = function (arr) {
      arr.__proto__ = Buffer.prototype;
      return arr
    };
  
    function from (that, value, encodingOrOffset, length) {
      if (typeof value === 'number') {
        throw new TypeError('"value" argument must not be a number')
      }
  
      if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
        return fromArrayBuffer(that, value, encodingOrOffset, length)
      }
  
      if (typeof value === 'string') {
        return fromString(that, value, encodingOrOffset)
      }
  
      return fromObject(that, value)
    }
  
    /**
     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
     * if value is a number.
     * Buffer.from(str[, encoding])
     * Buffer.from(array)
     * Buffer.from(buffer)
     * Buffer.from(arrayBuffer[, byteOffset[, length]])
     **/
    Buffer.from = function (value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length)
    };
  
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      Buffer.prototype.__proto__ = Uint8Array.prototype;
      Buffer.__proto__ = Uint8Array;
    }
  
    function assertSize (size) {
      if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be a number')
      } else if (size < 0) {
        throw new RangeError('"size" argument must not be negative')
      }
    }
  
    function alloc (that, size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(that, size)
      }
      if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpretted as a start offset.
        return typeof encoding === 'string'
          ? createBuffer(that, size).fill(fill, encoding)
          : createBuffer(that, size).fill(fill)
      }
      return createBuffer(that, size)
    }
  
    /**
     * Creates a new filled Buffer instance.
     * alloc(size[, fill[, encoding]])
     **/
    Buffer.alloc = function (size, fill, encoding) {
      return alloc(null, size, fill, encoding)
    };
  
    function allocUnsafe (that, size) {
      assertSize(size);
      that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
      if (!Buffer.TYPED_ARRAY_SUPPORT) {
        for (var i = 0; i < size; ++i) {
          that[i] = 0;
        }
      }
      return that
    }
  
    /**
     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
     * */
    Buffer.allocUnsafe = function (size) {
      return allocUnsafe(null, size)
    };
    /**
     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
     */
    Buffer.allocUnsafeSlow = function (size) {
      return allocUnsafe(null, size)
    };
  
    function fromString (that, string, encoding) {
      if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8';
      }
  
      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding')
      }
  
      var length = byteLength(string, encoding) | 0;
      that = createBuffer(that, length);
  
      var actual = that.write(string, encoding);
  
      if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        that = that.slice(0, actual);
      }
  
      return that
    }
  
    function fromArrayLike (that, array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      that = createBuffer(that, length);
      for (var i = 0; i < length; i += 1) {
        that[i] = array[i] & 255;
      }
      return that
    }
  
    function fromArrayBuffer (that, array, byteOffset, length) {
      array.byteLength; // this throws if `array` is not a valid ArrayBuffer
  
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('\'offset\' is out of bounds')
      }
  
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('\'length\' is out of bounds')
      }
  
      if (byteOffset === undefined && length === undefined) {
        array = new Uint8Array(array);
      } else if (length === undefined) {
        array = new Uint8Array(array, byteOffset);
      } else {
        array = new Uint8Array(array, byteOffset, length);
      }
  
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        // Return an augmented `Uint8Array` instance, for best performance
        that = array;
        that.__proto__ = Buffer.prototype;
      } else {
        // Fallback: Return an object instance of the Buffer class
        that = fromArrayLike(that, array);
      }
      return that
    }
  
    function fromObject (that, obj) {
      if (internalIsBuffer(obj)) {
        var len = checked(obj.length) | 0;
        that = createBuffer(that, len);
  
        if (that.length === 0) {
          return that
        }
  
        obj.copy(that, 0, 0, len);
        return that
      }
  
      if (obj) {
        if ((typeof ArrayBuffer !== 'undefined' &&
            obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
          if (typeof obj.length !== 'number' || isnan(obj.length)) {
            return createBuffer(that, 0)
          }
          return fromArrayLike(that, obj)
        }
  
        if (obj.type === 'Buffer' && isArray(obj.data)) {
          return fromArrayLike(that, obj.data)
        }
      }
  
      throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
    }
  
    function checked (length) {
      // Note: cannot use `length < kMaxLength()` here because that fails when
      // length is NaN (which is otherwise coerced to zero.)
      if (length >= kMaxLength()) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                             'size: 0x' + kMaxLength().toString(16) + ' bytes')
      }
      return length | 0
    }
    Buffer.isBuffer = isBuffer;
    function internalIsBuffer (b) {
      return !!(b != null && b._isBuffer)
    }
  
    Buffer.compare = function compare (a, b) {
      if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
        throw new TypeError('Arguments must be Buffers')
      }
  
      if (a === b) return 0
  
      var x = a.length;
      var y = b.length;
  
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break
        }
      }
  
      if (x < y) return -1
      if (y < x) return 1
      return 0
    };
  
    Buffer.isEncoding = function isEncoding (encoding) {
      switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true
        default:
          return false
      }
    };
  
    Buffer.concat = function concat (list, length) {
      if (!isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
  
      if (list.length === 0) {
        return Buffer.alloc(0)
      }
  
      var i;
      if (length === undefined) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
  
      var buffer = Buffer.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (!internalIsBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers')
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer
    };
  
    function byteLength (string, encoding) {
      if (internalIsBuffer(string)) {
        return string.length
      }
      if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
          (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
        return string.byteLength
      }
      if (typeof string !== 'string') {
        string = '' + string;
      }
  
      var len = string.length;
      if (len === 0) return 0
  
      // Use a for loop to avoid recursion
      var loweredCase = false;
      for (;;) {
        switch (encoding) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return len
          case 'utf8':
          case 'utf-8':
          case undefined:
            return utf8ToBytes(string).length
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return len * 2
          case 'hex':
            return len >>> 1
          case 'base64':
            return base64ToBytes(string).length
          default:
            if (loweredCase) return utf8ToBytes(string).length // assume utf8
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer.byteLength = byteLength;
  
    function slowToString (encoding, start, end) {
      var loweredCase = false;
  
      // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
      // property of a typed array.
  
      // This behaves neither like String nor Uint8Array in that we set start/end
      // to their upper/lower bounds if the value passed is out of range.
      // undefined is handled specially as per ECMA-262 6th Edition,
      // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
      if (start === undefined || start < 0) {
        start = 0;
      }
      // Return early if start > this.length. Done here to prevent potential uint32
      // coercion fail below.
      if (start > this.length) {
        return ''
      }
  
      if (end === undefined || end > this.length) {
        end = this.length;
      }
  
      if (end <= 0) {
        return ''
      }
  
      // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
      end >>>= 0;
      start >>>= 0;
  
      if (end <= start) {
        return ''
      }
  
      if (!encoding) encoding = 'utf8';
  
      while (true) {
        switch (encoding) {
          case 'hex':
            return hexSlice(this, start, end)
  
          case 'utf8':
          case 'utf-8':
            return utf8Slice(this, start, end)
  
          case 'ascii':
            return asciiSlice(this, start, end)
  
          case 'latin1':
          case 'binary':
            return latin1Slice(this, start, end)
  
          case 'base64':
            return base64Slice(this, start, end)
  
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return utf16leSlice(this, start, end)
  
          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
            encoding = (encoding + '').toLowerCase();
            loweredCase = true;
        }
      }
    }
  
    // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
    // Buffer instances.
    Buffer.prototype._isBuffer = true;
  
    function swap (b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
  
    Buffer.prototype.swap16 = function swap16 () {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits')
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this
    };
  
    Buffer.prototype.swap32 = function swap32 () {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits')
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this
    };
  
    Buffer.prototype.swap64 = function swap64 () {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits')
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this
    };
  
    Buffer.prototype.toString = function toString () {
      var length = this.length | 0;
      if (length === 0) return ''
      if (arguments.length === 0) return utf8Slice(this, 0, length)
      return slowToString.apply(this, arguments)
    };
  
    Buffer.prototype.equals = function equals (b) {
      if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
      if (this === b) return true
      return Buffer.compare(this, b) === 0
    };
  
    Buffer.prototype.inspect = function inspect () {
      var str = '';
      var max = INSPECT_MAX_BYTES;
      if (this.length > 0) {
        str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
        if (this.length > max) str += ' ... ';
      }
      return '<Buffer ' + str + '>'
    };
  
    Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target)) {
        throw new TypeError('Argument must be a Buffer')
      }
  
      if (start === undefined) {
        start = 0;
      }
      if (end === undefined) {
        end = target ? target.length : 0;
      }
      if (thisStart === undefined) {
        thisStart = 0;
      }
      if (thisEnd === undefined) {
        thisEnd = this.length;
      }
  
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index')
      }
  
      if (thisStart >= thisEnd && start >= end) {
        return 0
      }
      if (thisStart >= thisEnd) {
        return -1
      }
      if (start >= end) {
        return 1
      }
  
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
  
      if (this === target) return 0
  
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
  
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
  
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break
        }
      }
  
      if (x < y) return -1
      if (y < x) return 1
      return 0
    };
  
    // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
    // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
    //
    // Arguments:
    // - buffer - a Buffer to search
    // - val - a string, Buffer, or number
    // - byteOffset - an index into `buffer`; will be clamped to an int32
    // - encoding - an optional encoding, relevant is val is a string
    // - dir - true for indexOf, false for lastIndexOf
    function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
      // Empty buffer means no match
      if (buffer.length === 0) return -1
  
      // Normalize byteOffset
      if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
      } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
      }
      byteOffset = +byteOffset;  // Coerce to Number.
      if (isNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : (buffer.length - 1);
      }
  
      // Normalize byteOffset: negative offsets start from the end of the buffer
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1
      }
  
      // Normalize val
      if (typeof val === 'string') {
        val = Buffer.from(val, encoding);
      }
  
      // Finally, search either indexOf (if dir is true) or lastIndexOf
      if (internalIsBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
          return -1
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
      } else if (typeof val === 'number') {
        val = val & 0xFF; // Search for a byte value [0-255]
        if (Buffer.TYPED_ARRAY_SUPPORT &&
            typeof Uint8Array.prototype.indexOf === 'function') {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
          }
        }
        return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
      }
  
      throw new TypeError('val must be string, number or Buffer')
    }
  
    function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
  
      if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === 'ucs2' || encoding === 'ucs-2' ||
            encoding === 'utf16le' || encoding === 'utf-16le') {
          if (arr.length < 2 || val.length < 2) {
            return -1
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
  
      function read (buf, i) {
        if (indexSize === 1) {
          return buf[i]
        } else {
          return buf.readUInt16BE(i * indexSize)
        }
      }
  
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break
            }
          }
          if (found) return i
        }
      }
  
      return -1
    }
  
    Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1
    };
  
    Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
    };
  
    Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
    };
  
    function hexWrite (buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
  
      // must be an even number of digits
      var strLen = string.length;
      if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
  
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (isNaN(parsed)) return i
        buf[offset + i] = parsed;
      }
      return i
    }
  
    function utf8Write (buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
    }
  
    function asciiWrite (buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length)
    }
  
    function latin1Write (buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length)
    }
  
    function base64Write (buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length)
    }
  
    function ucs2Write (buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
    }
  
    Buffer.prototype.write = function write (string, offset, length, encoding) {
      // Buffer#write(string)
      if (offset === undefined) {
        encoding = 'utf8';
        length = this.length;
        offset = 0;
      // Buffer#write(string, encoding)
      } else if (length === undefined && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0;
      // Buffer#write(string, offset[, length][, encoding])
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === undefined) encoding = 'utf8';
        } else {
          encoding = length;
          length = undefined;
        }
      // legacy write(string, encoding, offset, length) - remove in v0.13
      } else {
        throw new Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported'
        )
      }
  
      var remaining = this.length - offset;
      if (length === undefined || length > remaining) length = remaining;
  
      if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds')
      }
  
      if (!encoding) encoding = 'utf8';
  
      var loweredCase = false;
      for (;;) {
        switch (encoding) {
          case 'hex':
            return hexWrite(this, string, offset, length)
  
          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length)
  
          case 'ascii':
            return asciiWrite(this, string, offset, length)
  
          case 'latin1':
          case 'binary':
            return latin1Write(this, string, offset, length)
  
          case 'base64':
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length)
  
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length)
  
          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
  
    Buffer.prototype.toJSON = function toJSON () {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      }
    };
  
    function base64Slice (buf, start, end) {
      if (start === 0 && end === buf.length) {
        return fromByteArray(buf)
      } else {
        return fromByteArray(buf.slice(start, end))
      }
    }
  
    function utf8Slice (buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
  
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = (firstByte > 0xEF) ? 4
          : (firstByte > 0xDF) ? 3
          : (firstByte > 0xBF) ? 2
          : 1;
  
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
  
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 0x80) {
                codePoint = firstByte;
              }
              break
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
                if (tempCodePoint > 0x7F) {
                  codePoint = tempCodePoint;
                }
              }
              break
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                  codePoint = tempCodePoint;
                }
              }
              break
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
  
        if (codePoint === null) {
          // we did not generate a valid codePoint so insert a
          // replacement char (U+FFFD) and advance only 1 byte
          codePoint = 0xFFFD;
          bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
          // encode to utf16 (surrogate pair dance)
          codePoint -= 0x10000;
          res.push(codePoint >>> 10 & 0x3FF | 0xD800);
          codePoint = 0xDC00 | codePoint & 0x3FF;
        }
  
        res.push(codePoint);
        i += bytesPerSequence;
      }
  
      return decodeCodePointsArray(res)
    }
  
    // Based on http://stackoverflow.com/a/22747272/680742, the browser with
    // the lowest limit is Chrome, with 0x10000 args.
    // We go 1 magnitude less, for safety
    var MAX_ARGUMENTS_LENGTH = 0x1000;
  
    function decodeCodePointsArray (codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
      }
  
      // Decode in chunks to avoid "call stack size exceeded".
      var res = '';
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res
    }
  
    function asciiSlice (buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);
  
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 0x7F);
      }
      return ret
    }
  
    function latin1Slice (buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);
  
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret
    }
  
    function hexSlice (buf, start, end) {
      var len = buf.length;
  
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
  
      var out = '';
      for (var i = start; i < end; ++i) {
        out += toHex(buf[i]);
      }
      return out
    }
  
    function utf16leSlice (buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = '';
      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res
    }
  
    Buffer.prototype.slice = function slice (start, end) {
      var len = this.length;
      start = ~~start;
      end = end === undefined ? len : ~~end;
  
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
  
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
  
      if (end < start) end = start;
  
      var newBuf;
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer(sliceLen, undefined);
        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }
  
      return newBuf
    };
  
    /*
     * Need to make sure that buffer isn't trying to write out of bounds.
     */
    function checkOffset (offset, ext, length) {
      if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
      if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
    }
  
    Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
  
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }
  
      return val
    };
  
    Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }
  
      var val = this[offset + --byteLength];
      var mul = 1;
      while (byteLength > 0 && (mul *= 0x100)) {
        val += this[offset + --byteLength] * mul;
      }
  
      return val
    };
  
    Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset]
    };
  
    Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | (this[offset + 1] << 8)
    };
  
    Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return (this[offset] << 8) | this[offset + 1]
    };
  
    Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
  
      return ((this[offset]) |
          (this[offset + 1] << 8) |
          (this[offset + 2] << 16)) +
          (this[offset + 3] * 0x1000000)
    };
  
    Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
  
      return (this[offset] * 0x1000000) +
        ((this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        this[offset + 3])
    };
  
    Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
  
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }
      mul *= 0x80;
  
      if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  
      return val
    };
  
    Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
  
      var i = byteLength;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 0x100)) {
        val += this[offset + --i] * mul;
      }
      mul *= 0x80;
  
      if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  
      return val
    };
  
    Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 0x80)) return (this[offset])
      return ((0xff - this[offset] + 1) * -1)
    };
  
    Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | (this[offset + 1] << 8);
      return (val & 0x8000) ? val | 0xFFFF0000 : val
    };
  
    Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | (this[offset] << 8);
      return (val & 0x8000) ? val | 0xFFFF0000 : val
    };
  
    Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
  
      return (this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16) |
        (this[offset + 3] << 24)
    };
  
    Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
  
      return (this[offset] << 24) |
        (this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        (this[offset + 3])
    };
  
    Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return read(this, offset, true, 23, 4)
    };
  
    Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return read(this, offset, false, 23, 4)
    };
  
    Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return read(this, offset, true, 52, 8)
    };
  
    Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return read(this, offset, false, 52, 8)
    };
  
    function checkInt (buf, value, offset, ext, max, min) {
      if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
      if (offset + ext > buf.length) throw new RangeError('Index out of range')
    }
  
    Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }
  
      var mul = 1;
      var i = 0;
      this[offset] = value & 0xFF;
      while (++i < byteLength && (mul *= 0x100)) {
        this[offset + i] = (value / mul) & 0xFF;
      }
  
      return offset + byteLength
    };
  
    Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }
  
      var i = byteLength - 1;
      var mul = 1;
      this[offset + i] = value & 0xFF;
      while (--i >= 0 && (mul *= 0x100)) {
        this[offset + i] = (value / mul) & 0xFF;
      }
  
      return offset + byteLength
    };
  
    Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      this[offset] = (value & 0xff);
      return offset + 1
    };
  
    function objectWriteUInt16 (buf, value, offset, littleEndian) {
      if (value < 0) value = 0xffff + value + 1;
      for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
        buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
          (littleEndian ? i : 1 - i) * 8;
      }
    }
  
    Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value & 0xff);
        this[offset + 1] = (value >>> 8);
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2
    };
  
    Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value >>> 8);
        this[offset + 1] = (value & 0xff);
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2
    };
  
    function objectWriteUInt32 (buf, value, offset, littleEndian) {
      if (value < 0) value = 0xffffffff + value + 1;
      for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
        buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
      }
    }
  
    Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = (value >>> 24);
        this[offset + 2] = (value >>> 16);
        this[offset + 1] = (value >>> 8);
        this[offset] = (value & 0xff);
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4
    };
  
    Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value >>> 24);
        this[offset + 1] = (value >>> 16);
        this[offset + 2] = (value >>> 8);
        this[offset + 3] = (value & 0xff);
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4
    };
  
    Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
  
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }
  
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 0xFF;
      while (++i < byteLength && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
      }
  
      return offset + byteLength
    };
  
    Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
  
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }
  
      var i = byteLength - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 0xFF;
      while (--i >= 0 && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
      }
  
      return offset + byteLength
    };
  
    Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      if (value < 0) value = 0xff + value + 1;
      this[offset] = (value & 0xff);
      return offset + 1
    };
  
    Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value & 0xff);
        this[offset + 1] = (value >>> 8);
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2
    };
  
    Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value >>> 8);
        this[offset + 1] = (value & 0xff);
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2
    };
  
    Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value & 0xff);
        this[offset + 1] = (value >>> 8);
        this[offset + 2] = (value >>> 16);
        this[offset + 3] = (value >>> 24);
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4
    };
  
    Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
      if (value < 0) value = 0xffffffff + value + 1;
      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = (value >>> 24);
        this[offset + 1] = (value >>> 16);
        this[offset + 2] = (value >>> 8);
        this[offset + 3] = (value & 0xff);
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4
    };
  
    function checkIEEE754 (buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError('Index out of range')
      if (offset < 0) throw new RangeError('Index out of range')
    }
  
    function writeFloat (buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4
    }
  
    Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert)
    };
  
    Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert)
    };
  
    function writeDouble (buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8
    }
  
    Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert)
    };
  
    Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert)
    };
  
    // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
    Buffer.prototype.copy = function copy (target, targetStart, start, end) {
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
  
      // Copy 0 bytes; we're done
      if (end === start) return 0
      if (target.length === 0 || this.length === 0) return 0
  
      // Fatal error conditions
      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds')
      }
      if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
      if (end < 0) throw new RangeError('sourceEnd out of bounds')
  
      // Are we oob?
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
  
      var len = end - start;
      var i;
  
      if (this === target && start < targetStart && targetStart < end) {
        // descending copy from end
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
        // ascending copy from start
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      }
  
      return len
    };
  
    // Usage:
    //    buffer.fill(number[, offset[, end]])
    //    buffer.fill(buffer[, offset[, end]])
    //    buffer.fill(string[, offset[, end]][, encoding])
    Buffer.prototype.fill = function fill (val, start, end, encoding) {
      // Handle string cases:
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === 'string') {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== undefined && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string')
        }
        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding)
        }
      } else if (typeof val === 'number') {
        val = val & 255;
      }
  
      // Invalid ranges are not set to a default, so can range check early.
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index')
      }
  
      if (end <= start) {
        return this
      }
  
      start = start >>> 0;
      end = end === undefined ? this.length : end >>> 0;
  
      if (!val) val = 0;
  
      var i;
      if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = internalIsBuffer(val)
          ? val
          : utf8ToBytes(new Buffer(val, encoding).toString());
        var len = bytes.length;
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
  
      return this
    };
  
    // HELPER FUNCTIONS
    // ================
  
    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  
    function base64clean (str) {
      // Node strips out invalid characters like \n and \t from the string, base64-js does not
      str = stringtrim(str).replace(INVALID_BASE64_RE, '');
      // Node converts strings with length < 2 to ''
      if (str.length < 2) return ''
      // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
      while (str.length % 4 !== 0) {
        str = str + '=';
      }
      return str
    }
  
    function stringtrim (str) {
      if (str.trim) return str.trim()
      return str.replace(/^\s+|\s+$/g, '')
    }
  
    function toHex (n) {
      if (n < 16) return '0' + n.toString(16)
      return n.toString(16)
    }
  
    function utf8ToBytes (string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
  
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
  
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
          // last char was a lead
          if (!leadSurrogate) {
            // no lead yet
            if (codePoint > 0xDBFF) {
              // unexpected trail
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue
            } else if (i + 1 === length) {
              // unpaired lead
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue
            }
  
            // valid lead
            leadSurrogate = codePoint;
  
            continue
          }
  
          // 2 leads in a row
          if (codePoint < 0xDC00) {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            leadSurrogate = codePoint;
            continue
          }
  
          // valid surrogate pair
          codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) {
          // valid bmp char, but last char was a lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
  
        leadSurrogate = null;
  
        // encode utf8
        if (codePoint < 0x80) {
          if ((units -= 1) < 0) break
          bytes.push(codePoint);
        } else if (codePoint < 0x800) {
          if ((units -= 2) < 0) break
          bytes.push(
            codePoint >> 0x6 | 0xC0,
            codePoint & 0x3F | 0x80
          );
        } else if (codePoint < 0x10000) {
          if ((units -= 3) < 0) break
          bytes.push(
            codePoint >> 0xC | 0xE0,
            codePoint >> 0x6 & 0x3F | 0x80,
            codePoint & 0x3F | 0x80
          );
        } else if (codePoint < 0x110000) {
          if ((units -= 4) < 0) break
          bytes.push(
            codePoint >> 0x12 | 0xF0,
            codePoint >> 0xC & 0x3F | 0x80,
            codePoint >> 0x6 & 0x3F | 0x80,
            codePoint & 0x3F | 0x80
          );
        } else {
          throw new Error('Invalid code point')
        }
      }
  
      return bytes
    }
  
    function asciiToBytes (str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF);
      }
      return byteArray
    }
  
    function utf16leToBytes (str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break
  
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
  
      return byteArray
    }
  
  
    function base64ToBytes (str) {
      return toByteArray(base64clean(str))
    }
  
    function blitBuffer (src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if ((i + offset >= dst.length) || (i >= src.length)) break
        dst[i + offset] = src[i];
      }
      return i
    }
  
    function isnan (val) {
      return val !== val // eslint-disable-line no-self-compare
    }
  
  
    // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
    // The _isBuffer check is for Safari 5-7 support, because it's missing
    // Object.prototype.constructor. Remove this eventually
    function isBuffer(obj) {
      return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
    }
  
    function isFastBuffer (obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
    }
  
    // For Node v0.10 support. Remove this eventually.
    function isSlowBuffer (obj) {
      return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
    }
  
    var inherits;
    if (typeof Object.create === 'function'){
      inherits = function inherits(ctor, superCtor) {
        // implementation from standard node.js 'util' module
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      inherits = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    var inherits$1 = inherits;
  
    var formatRegExp = /%[sdj%]/g;
    function format(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(' ');
      }
  
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x) {
        if (x === '%%') return '%';
        if (i >= len) return x;
        switch (x) {
          case '%s': return String(args[i++]);
          case '%d': return Number(args[i++]);
          case '%j':
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return '[Circular]';
            }
          default:
            return x;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull$1(x) || !isObject$1(x)) {
          str += ' ' + x;
        } else {
          str += ' ' + inspect(x);
        }
      }
      return str;
    }
  
    // Mark that a method should not be used.
    // Returns a modified function which warns once by default.
    // If --no-deprecation is set, then it is a no-op.
    function deprecate(fn, msg) {
      // Allow for deprecating things in the process of starting up.
      if (isUndefined(global$1.process)) {
        return function() {
          return deprecate(fn, msg).apply(this, arguments);
        };
      }
  
      var warned = false;
      function deprecated() {
        if (!warned) {
          {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
  
      return deprecated;
    }
  
    var debugs = {};
    var debugEnviron;
    function debuglog(set) {
      if (isUndefined(debugEnviron))
        debugEnviron =  '';
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
          var pid = 0;
          debugs[set] = function() {
            var msg = format.apply(null, arguments);
            console.error('%s %d: %s', set, pid, msg);
          };
        } else {
          debugs[set] = function() {};
        }
      }
      return debugs[set];
    }
  
    /**
     * Echos the value of a value. Trys to print the value out
     * in the best way possible given the different types.
     *
     * @param {Object} obj The object to print out.
     * @param {Object} opts Optional options object that alters the output.
     */
    /* legacy: obj, showHidden, depth, colors*/
    function inspect(obj, opts) {
      // default options
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      // legacy...
      if (arguments.length >= 3) ctx.depth = arguments[2];
      if (arguments.length >= 4) ctx.colors = arguments[3];
      if (isBoolean$1(opts)) {
        // legacy...
        ctx.showHidden = opts;
      } else if (opts) {
        // got an "options" object
        _extend(ctx, opts);
      }
      // set default options
      if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
      if (isUndefined(ctx.depth)) ctx.depth = 2;
      if (isUndefined(ctx.colors)) ctx.colors = false;
      if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
      if (ctx.colors) ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
  
    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    inspect.colors = {
      'bold' : [1, 22],
      'italic' : [3, 23],
      'underline' : [4, 24],
      'inverse' : [7, 27],
      'white' : [37, 39],
      'grey' : [90, 39],
      'black' : [30, 39],
      'blue' : [34, 39],
      'cyan' : [36, 39],
      'green' : [32, 39],
      'magenta' : [35, 39],
      'red' : [31, 39],
      'yellow' : [33, 39]
    };
  
    // Don't use 'blue' not visible on cmd.exe
    inspect.styles = {
      'special': 'cyan',
      'number': 'yellow',
      'boolean': 'yellow',
      'undefined': 'grey',
      'null': 'bold',
      'string': 'green',
      'date': 'magenta',
      // "name": intentionally not styling
      'regexp': 'red'
    };
  
  
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
  
      if (style) {
        return '\u001b[' + inspect.colors[style][0] + 'm' + str +
               '\u001b[' + inspect.colors[style][1] + 'm';
      } else {
        return str;
      }
    }
  
  
    function stylizeNoColor(str, styleType) {
      return str;
    }
  
  
    function arrayToHash(array) {
      var hash = {};
  
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
  
      return hash;
    }
  
  
    function formatValue(ctx, value, recurseTimes) {
      // Provide a hook for user-specified inspect functions.
      // Check that value is an object with an inspect function on it
      if (ctx.customInspect &&
          value &&
          isFunction(value.inspect) &&
          // Filter out the util module, it's inspect function is special
          value.inspect !== inspect &&
          // Also filter out any prototype objects using the circular check.
          !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
  
      // Primitive types cannot have properties
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
  
      // Look up the keys of the object.
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
  
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
  
      // IE doesn't make error fields non-enumerable
      // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
      if (isError(value)
          && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError$1(value);
      }
  
      // Some type of object without properties can be shortcutted.
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ': ' + value.name : '';
          return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
          return formatError$1(value);
        }
      }
  
      var base = '', array = false, braces = ['{', '}'];
  
      // Make Array say that they are Array
      if (isArray$1(value)) {
        array = true;
        braces = ['[', ']'];
      }
  
      // Make functions say that they are functions
      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      }
  
      // Make RegExps say that they are RegExps
      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      }
  
      // Make dates with properties first say the date
      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      }
  
      // Make error with message first say the error
      if (isError(value)) {
        base = ' ' + formatError$1(value);
      }
  
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
  
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
          return ctx.stylize('[Object]', 'special');
        }
      }
  
      ctx.seen.push(value);
  
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
  
      ctx.seen.pop();
  
      return reduceToSingleString(output, base, braces);
    }
  
  
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize('undefined', 'undefined');
      if (isString(value)) {
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                 .replace(/'/g, "\\'")
                                                 .replace(/\\"/g, '"') + '\'';
        return ctx.stylize(simple, 'string');
      }
      if (isNumber(value))
        return ctx.stylize('' + value, 'number');
      if (isBoolean$1(value))
        return ctx.stylize('' + value, 'boolean');
      // For some reason typeof null is "object", so special case here.
      if (isNull$1(value))
        return ctx.stylize('null', 'null');
    }
  
  
    function formatError$1(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }
  
  
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
              String(i), true));
        } else {
          output.push('');
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
              key, true));
        }
      });
      return output;
    }
  
  
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
          str = ctx.stylize('[Getter]', 'special');
        }
      } else {
        if (desc.set) {
          str = ctx.stylize('[Setter]', 'special');
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull$1(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (array) {
              str = str.split('\n').map(function(line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function(line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = ctx.stylize('[Circular]', 'special');
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'")
                     .replace(/\\"/g, '"')
                     .replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }
  
      return name + ': ' + str;
    }
  
  
    function reduceToSingleString(output, base, braces) {
      var length = output.reduce(function(prev, cur) {
        if (cur.indexOf('\n') >= 0) ;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);
  
      if (length > 60) {
        return braces[0] +
               (base === '' ? '' : base + '\n ') +
               ' ' +
               output.join(',\n  ') +
               ' ' +
               braces[1];
      }
  
      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }
  
  
    // NOTE: These type checking functions intentionally don't use `instanceof`
    // because it is fragile and can be easily faked with `Object.create()`.
    function isArray$1(ar) {
      return Array.isArray(ar);
    }
  
    function isBoolean$1(arg) {
      return typeof arg === 'boolean';
    }
  
    function isNull$1(arg) {
      return arg === null;
    }
  
    function isNullOrUndefined(arg) {
      return arg == null;
    }
  
    function isNumber(arg) {
      return typeof arg === 'number';
    }
  
    function isString(arg) {
      return typeof arg === 'string';
    }
  
    function isSymbol(arg) {
      return typeof arg === 'symbol';
    }
  
    function isUndefined(arg) {
      return arg === void 0;
    }
  
    function isRegExp(re) {
      return isObject$1(re) && objectToString(re) === '[object RegExp]';
    }
  
    function isObject$1(arg) {
      return typeof arg === 'object' && arg !== null;
    }
  
    function isDate(d) {
      return isObject$1(d) && objectToString(d) === '[object Date]';
    }
  
    function isError(e) {
      return isObject$1(e) &&
          (objectToString(e) === '[object Error]' || e instanceof Error);
    }
  
    function isFunction(arg) {
      return typeof arg === 'function';
    }
  
    function isPrimitive(arg) {
      return arg === null ||
             typeof arg === 'boolean' ||
             typeof arg === 'number' ||
             typeof arg === 'string' ||
             typeof arg === 'symbol' ||  // ES6 symbol
             typeof arg === 'undefined';
    }
  
    function isBuffer$1(maybeBuf) {
      return Buffer.isBuffer(maybeBuf);
    }
  
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
  
  
    function pad(n) {
      return n < 10 ? '0' + n.toString(10) : n.toString(10);
    }
  
  
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                  'Oct', 'Nov', 'Dec'];
  
    // 26 Feb 16:19:34
    function timestamp$1() {
      var d = new Date();
      var time = [pad(d.getHours()),
                  pad(d.getMinutes()),
                  pad(d.getSeconds())].join(':');
      return [d.getDate(), months[d.getMonth()], time].join(' ');
    }
  
  
    // log is just a thin wrapper to console.log that prepends a timestamp
    function log() {
      console.log('%s - %s', timestamp$1(), format.apply(null, arguments));
    }
  
    function _extend(origin, add) {
      // Don't do anything if add isn't an object
      if (!add || !isObject$1(add)) return origin;
  
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
  
    var util = {
      inherits: inherits$1,
      _extend: _extend,
      log: log,
      isBuffer: isBuffer$1,
      isPrimitive: isPrimitive,
      isFunction: isFunction,
      isError: isError,
      isDate: isDate,
      isObject: isObject$1,
      isRegExp: isRegExp,
      isUndefined: isUndefined,
      isSymbol: isSymbol,
      isString: isString,
      isNumber: isNumber,
      isNullOrUndefined: isNullOrUndefined,
      isNull: isNull$1,
      isBoolean: isBoolean$1,
      isArray: isArray$1,
      inspect: inspect,
      deprecate: deprecate,
      format: format,
      debuglog: debuglog
    };
  
    var util$1 = /*#__PURE__*/Object.freeze({
      __proto__: null,
      format: format,
      deprecate: deprecate,
      debuglog: debuglog,
      inspect: inspect,
      isArray: isArray$1,
      isBoolean: isBoolean$1,
      isNull: isNull$1,
      isNullOrUndefined: isNullOrUndefined,
      isNumber: isNumber,
      isString: isString,
      isSymbol: isSymbol,
      isUndefined: isUndefined,
      isRegExp: isRegExp,
      isObject: isObject$1,
      isDate: isDate,
      isError: isError,
      isFunction: isFunction,
      isPrimitive: isPrimitive,
      isBuffer: isBuffer$1,
      log: log,
      inherits: inherits$1,
      _extend: _extend,
      'default': util
    });
  
    var yaml = createCommonjsModule(function (module, exports) {
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    // Distributed under an MIT license: https://codemirror.net/LICENSE
  
    (function(mod) {
      mod(codemirror);
    })(function(CodeMirror) {
  
    CodeMirror.defineMode("yaml", function() {
  
      var cons = ['true', 'false', 'on', 'off', 'yes', 'no'];
      var keywordRegex = new RegExp("\\b(("+cons.join(")|(")+"))$", 'i');
  
      return {
        token: function(stream, state) {
          var ch = stream.peek();
          var esc = state.escaped;
          state.escaped = false;
          /* comments */
          if (ch == "#" && (stream.pos == 0 || /\s/.test(stream.string.charAt(stream.pos - 1)))) {
            stream.skipToEnd();
            return "comment";
          }
  
          if (stream.match(/^('([^']|\\.)*'?|"([^"]|\\.)*"?)/))
            return "string";
  
          if (state.literal && stream.indentation() > state.keyCol) {
            stream.skipToEnd(); return "string";
          } else if (state.literal) { state.literal = false; }
          if (stream.sol()) {
            state.keyCol = 0;
            state.pair = false;
            state.pairStart = false;
            /* document start */
            if(stream.match(/---/)) { return "def"; }
            /* document end */
            if (stream.match(/\.\.\./)) { return "def"; }
            /* array list item */
            if (stream.match(/\s*-\s+/)) { return 'meta'; }
          }
          /* inline pairs/lists */
          if (stream.match(/^(\{|\}|\[|\])/)) {
            if (ch == '{')
              state.inlinePairs++;
            else if (ch == '}')
              state.inlinePairs--;
            else if (ch == '[')
              state.inlineList++;
            else
              state.inlineList--;
            return 'meta';
          }
  
          /* list seperator */
          if (state.inlineList > 0 && !esc && ch == ',') {
            stream.next();
            return 'meta';
          }
          /* pairs seperator */
          if (state.inlinePairs > 0 && !esc && ch == ',') {
            state.keyCol = 0;
            state.pair = false;
            state.pairStart = false;
            stream.next();
            return 'meta';
          }
  
          /* start of value of a pair */
          if (state.pairStart) {
            /* block literals */
            if (stream.match(/^\s*(\||\>)\s*/)) { state.literal = true; return 'meta'; }        /* references */
            if (stream.match(/^\s*(\&|\*)[a-z0-9\._-]+\b/i)) { return 'variable-2'; }
            /* numbers */
            if (state.inlinePairs == 0 && stream.match(/^\s*-?[0-9\.\,]+\s?$/)) { return 'number'; }
            if (state.inlinePairs > 0 && stream.match(/^\s*-?[0-9\.\,]+\s?(?=(,|}))/)) { return 'number'; }
            /* keywords */
            if (stream.match(keywordRegex)) { return 'keyword'; }
          }
  
          /* pairs (associative arrays) -> key */
          if (!state.pair && stream.match(/^\s*(?:[,\[\]{}&*!|>'"%@`][^\s'":]|[^,\[\]{}#&*!|>'"%@`])[^#]*?(?=\s*:($|\s))/)) {
            state.pair = true;
            state.keyCol = stream.indentation();
            return "atom";
          }
          if (state.pair && stream.match(/^:\s*/)) { state.pairStart = true; return 'meta'; }
  
          /* nothing found, continue */
          state.pairStart = false;
          state.escaped = (ch == '\\');
          stream.next();
          return null;
        },
        startState: function() {
          return {
            pair: false,
            pairStart: false,
            keyCol: 0,
            inlinePairs: 0,
            inlineList: 0,
            literal: false,
            escaped: false
          };
        },
        lineComment: "#",
        fold: "indent"
      };
    });
  
    CodeMirror.defineMIME("text/x-yaml", "yaml");
    CodeMirror.defineMIME("text/yaml", "yaml");
  
    });
    });
  
    var javascript = createCommonjsModule(function (module, exports) {
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    // Distributed under an MIT license: https://codemirror.net/LICENSE
  
    (function(mod) {
      mod(codemirror);
    })(function(CodeMirror) {
  
    CodeMirror.defineMode("javascript", function(config, parserConfig) {
      var indentUnit = config.indentUnit;
      var statementIndent = parserConfig.statementIndent;
      var jsonldMode = parserConfig.jsonld;
      var jsonMode = parserConfig.json || jsonldMode;
      var isTS = parserConfig.typescript;
      var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
  
      // Tokenizer
  
      var keywords = function(){
        function kw(type) {return {type: type, style: "keyword"};}
        var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
        var operator = kw("operator"), atom = {type: "atom", style: "atom"};
  
        return {
          "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
          "return": D, "break": D, "continue": D, "new": kw("new"), "delete": C, "void": C, "throw": C,
          "debugger": kw("debugger"), "var": kw("var"), "const": kw("var"), "let": kw("var"),
          "function": kw("function"), "catch": kw("catch"),
          "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
          "in": operator, "typeof": operator, "instanceof": operator,
          "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
          "this": kw("this"), "class": kw("class"), "super": kw("atom"),
          "yield": C, "export": kw("export"), "import": kw("import"), "extends": C,
          "await": C
        };
      }();
  
      var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
      var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
  
      function readRegexp(stream) {
        var escaped = false, next, inSet = false;
        while ((next = stream.next()) != null) {
          if (!escaped) {
            if (next == "/" && !inSet) return;
            if (next == "[") inSet = true;
            else if (inSet && next == "]") inSet = false;
          }
          escaped = !escaped && next == "\\";
        }
      }
  
      // Used as scratch variables to communicate multiple values without
      // consing up tons of objects.
      var type, content;
      function ret(tp, style, cont) {
        type = tp; content = cont;
        return style;
      }
      function tokenBase(stream, state) {
        var ch = stream.next();
        if (ch == '"' || ch == "'") {
          state.tokenize = tokenString(ch);
          return state.tokenize(stream, state);
        } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
          return ret("number", "number");
        } else if (ch == "." && stream.match("..")) {
          return ret("spread", "meta");
        } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
          return ret(ch);
        } else if (ch == "=" && stream.eat(">")) {
          return ret("=>", "operator");
        } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
          return ret("number", "number");
        } else if (/\d/.test(ch)) {
          stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
          return ret("number", "number");
        } else if (ch == "/") {
          if (stream.eat("*")) {
            state.tokenize = tokenComment;
            return tokenComment(stream, state);
          } else if (stream.eat("/")) {
            stream.skipToEnd();
            return ret("comment", "comment");
          } else if (expressionAllowed(stream, state, 1)) {
            readRegexp(stream);
            stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
            return ret("regexp", "string-2");
          } else {
            stream.eat("=");
            return ret("operator", "operator", stream.current());
          }
        } else if (ch == "`") {
          state.tokenize = tokenQuasi;
          return tokenQuasi(stream, state);
        } else if (ch == "#" && stream.peek() == "!") {
          stream.skipToEnd();
          return ret("meta", "meta");
        } else if (ch == "#" && stream.eatWhile(wordRE)) {
          return ret("variable", "property")
        } else if (ch == "<" && stream.match("!--") ||
                   (ch == "-" && stream.match("->") && !/\S/.test(stream.string.slice(0, stream.start)))) {
          stream.skipToEnd();
          return ret("comment", "comment")
        } else if (isOperatorChar.test(ch)) {
          if (ch != ">" || !state.lexical || state.lexical.type != ">") {
            if (stream.eat("=")) {
              if (ch == "!" || ch == "=") stream.eat("=");
            } else if (/[<>*+\-|&?]/.test(ch)) {
              stream.eat(ch);
              if (ch == ">") stream.eat(ch);
            }
          }
          if (ch == "?" && stream.eat(".")) return ret(".")
          return ret("operator", "operator", stream.current());
        } else if (wordRE.test(ch)) {
          stream.eatWhile(wordRE);
          var word = stream.current();
          if (state.lastType != ".") {
            if (keywords.propertyIsEnumerable(word)) {
              var kw = keywords[word];
              return ret(kw.type, kw.style, word)
            }
            if (word == "async" && stream.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, false))
              return ret("async", "keyword", word)
          }
          return ret("variable", "variable", word)
        }
      }
  
      function tokenString(quote) {
        return function(stream, state) {
          var escaped = false, next;
          if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
            state.tokenize = tokenBase;
            return ret("jsonld-keyword", "meta");
          }
          while ((next = stream.next()) != null) {
            if (next == quote && !escaped) break;
            escaped = !escaped && next == "\\";
          }
          if (!escaped) state.tokenize = tokenBase;
          return ret("string", "string");
        };
      }
  
      function tokenComment(stream, state) {
        var maybeEnd = false, ch;
        while (ch = stream.next()) {
          if (ch == "/" && maybeEnd) {
            state.tokenize = tokenBase;
            break;
          }
          maybeEnd = (ch == "*");
        }
        return ret("comment", "comment");
      }
  
      function tokenQuasi(stream, state) {
        var escaped = false, next;
        while ((next = stream.next()) != null) {
          if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
            state.tokenize = tokenBase;
            break;
          }
          escaped = !escaped && next == "\\";
        }
        return ret("quasi", "string-2", stream.current());
      }
  
      var brackets = "([{}])";
      // This is a crude lookahead trick to try and notice that we're
      // parsing the argument patterns for a fat-arrow function before we
      // actually hit the arrow token. It only works if the arrow is on
      // the same line as the arguments and there's no strange noise
      // (comments) in between. Fallback is to only notice when we hit the
      // arrow, and not declare the arguments as locals for the arrow
      // body.
      function findFatArrow(stream, state) {
        if (state.fatArrowAt) state.fatArrowAt = null;
        var arrow = stream.string.indexOf("=>", stream.start);
        if (arrow < 0) return;
  
        if (isTS) { // Try to skip TypeScript return type declarations after the arguments
          var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow));
          if (m) arrow = m.index;
        }
  
        var depth = 0, sawSomething = false;
        for (var pos = arrow - 1; pos >= 0; --pos) {
          var ch = stream.string.charAt(pos);
          var bracket = brackets.indexOf(ch);
          if (bracket >= 0 && bracket < 3) {
            if (!depth) { ++pos; break; }
            if (--depth == 0) { if (ch == "(") sawSomething = true; break; }
          } else if (bracket >= 3 && bracket < 6) {
            ++depth;
          } else if (wordRE.test(ch)) {
            sawSomething = true;
          } else if (/["'\/`]/.test(ch)) {
            for (;; --pos) {
              if (pos == 0) return
              var next = stream.string.charAt(pos - 1);
              if (next == ch && stream.string.charAt(pos - 2) != "\\") { pos--; break }
            }
          } else if (sawSomething && !depth) {
            ++pos;
            break;
          }
        }
        if (sawSomething && !depth) state.fatArrowAt = pos;
      }
  
      // Parser
  
      var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true};
  
      function JSLexical(indented, column, type, align, prev, info) {
        this.indented = indented;
        this.column = column;
        this.type = type;
        this.prev = prev;
        this.info = info;
        if (align != null) this.align = align;
      }
  
      function inScope(state, varname) {
        for (var v = state.localVars; v; v = v.next)
          if (v.name == varname) return true;
        for (var cx = state.context; cx; cx = cx.prev) {
          for (var v = cx.vars; v; v = v.next)
            if (v.name == varname) return true;
        }
      }
  
      function parseJS(state, style, type, content, stream) {
        var cc = state.cc;
        // Communicate our context to the combinators.
        // (Less wasteful than consing up a hundred closures on every call.)
        cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc; cx.style = style;
  
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = true;
  
        while(true) {
          var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
          if (combinator(type, content)) {
            while(cc.length && cc[cc.length - 1].lex)
              cc.pop()();
            if (cx.marked) return cx.marked;
            if (type == "variable" && inScope(state, content)) return "variable-2";
            return style;
          }
        }
      }
  
      // Combinator utils
  
      var cx = {state: null, column: null, marked: null, cc: null};
      function pass() {
        for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
      }
      function cont() {
        pass.apply(null, arguments);
        return true;
      }
      function inList(name, list) {
        for (var v = list; v; v = v.next) if (v.name == name) return true
        return false;
      }
      function register(varname) {
        var state = cx.state;
        cx.marked = "def";
        if (state.context) {
          if (state.lexical.info == "var" && state.context && state.context.block) {
            // FIXME function decls are also not block scoped
            var newContext = registerVarScoped(varname, state.context);
            if (newContext != null) {
              state.context = newContext;
              return
            }
          } else if (!inList(varname, state.localVars)) {
            state.localVars = new Var(varname, state.localVars);
            return
          }
        }
        // Fall through means this is global
        if (parserConfig.globalVars && !inList(varname, state.globalVars))
          state.globalVars = new Var(varname, state.globalVars);
      }
      function registerVarScoped(varname, context) {
        if (!context) {
          return null
        } else if (context.block) {
          var inner = registerVarScoped(varname, context.prev);
          if (!inner) return null
          if (inner == context.prev) return context
          return new Context(inner, context.vars, true)
        } else if (inList(varname, context.vars)) {
          return context
        } else {
          return new Context(context.prev, new Var(varname, context.vars), false)
        }
      }
  
      function isModifier(name) {
        return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly"
      }
  
      // Combinators
  
      function Context(prev, vars, block) { this.prev = prev; this.vars = vars; this.block = block; }
      function Var(name, next) { this.name = name; this.next = next; }
  
      var defaultVars = new Var("this", new Var("arguments", null));
      function pushcontext() {
        cx.state.context = new Context(cx.state.context, cx.state.localVars, false);
        cx.state.localVars = defaultVars;
      }
      function pushblockcontext() {
        cx.state.context = new Context(cx.state.context, cx.state.localVars, true);
        cx.state.localVars = null;
      }
      function popcontext() {
        cx.state.localVars = cx.state.context.vars;
        cx.state.context = cx.state.context.prev;
      }
      popcontext.lex = true;
      function pushlex(type, info) {
        var result = function() {
          var state = cx.state, indent = state.indented;
          if (state.lexical.type == "stat") indent = state.lexical.indented;
          else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
            indent = outer.indented;
          state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
        };
        result.lex = true;
        return result;
      }
      function poplex() {
        var state = cx.state;
        if (state.lexical.prev) {
          if (state.lexical.type == ")")
            state.indented = state.lexical.indented;
          state.lexical = state.lexical.prev;
        }
      }
      poplex.lex = true;
  
      function expect(wanted) {
        function exp(type) {
          if (type == wanted) return cont();
          else if (wanted == ";" || type == "}" || type == ")" || type == "]") return pass();
          else return cont(exp);
        }    return exp;
      }
  
      function statement(type, value) {
        if (type == "var") return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
        if (type == "keyword a") return cont(pushlex("form"), parenExpr, statement, poplex);
        if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
        if (type == "keyword d") return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
        if (type == "debugger") return cont(expect(";"));
        if (type == "{") return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
        if (type == ";") return cont();
        if (type == "if") {
          if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
            cx.state.cc.pop()();
          return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
        }
        if (type == "function") return cont(functiondef);
        if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
        if (type == "class" || (isTS && value == "interface")) {
          cx.marked = "keyword";
          return cont(pushlex("form", type == "class" ? type : value), className, poplex)
        }
        if (type == "variable") {
          if (isTS && value == "declare") {
            cx.marked = "keyword";
            return cont(statement)
          } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
            cx.marked = "keyword";
            if (value == "enum") return cont(enumdef);
            else if (value == "type") return cont(typename, expect("operator"), typeexpr, expect(";"));
            else return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex)
          } else if (isTS && value == "namespace") {
            cx.marked = "keyword";
            return cont(pushlex("form"), expression, statement, poplex)
          } else if (isTS && value == "abstract") {
            cx.marked = "keyword";
            return cont(statement)
          } else {
            return cont(pushlex("stat"), maybelabel);
          }
        }
        if (type == "switch") return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"), pushblockcontext,
                                          block, poplex, poplex, popcontext);
        if (type == "case") return cont(expression, expect(":"));
        if (type == "default") return cont(expect(":"));
        if (type == "catch") return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
        if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
        if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
        if (type == "async") return cont(statement)
        if (value == "@") return cont(expression, statement)
        return pass(pushlex("stat"), expression, expect(";"), poplex);
      }
      function maybeCatchBinding(type) {
        if (type == "(") return cont(funarg, expect(")"))
      }
      function expression(type, value) {
        return expressionInner(type, value, false);
      }
      function expressionNoComma(type, value) {
        return expressionInner(type, value, true);
      }
      function parenExpr(type) {
        if (type != "(") return pass()
        return cont(pushlex(")"), maybeexpression, expect(")"), poplex)
      }
      function expressionInner(type, value, noComma) {
        if (cx.state.fatArrowAt == cx.stream.start) {
          var body = noComma ? arrowBodyNoComma : arrowBody;
          if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
          else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
        }
  
        var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
        if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
        if (type == "function") return cont(functiondef, maybeop);
        if (type == "class" || (isTS && value == "interface")) { cx.marked = "keyword"; return cont(pushlex("form"), classExpression, poplex); }
        if (type == "keyword c" || type == "async") return cont(noComma ? expressionNoComma : expression);
        if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
        if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
        if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
        if (type == "{") return contCommasep(objprop, "}", null, maybeop);
        if (type == "quasi") return pass(quasi, maybeop);
        if (type == "new") return cont(maybeTarget(noComma));
        if (type == "import") return cont(expression);
        return cont();
      }
      function maybeexpression(type) {
        if (type.match(/[;\}\)\],]/)) return pass();
        return pass(expression);
      }
  
      function maybeoperatorComma(type, value) {
        if (type == ",") return cont(maybeexpression);
        return maybeoperatorNoComma(type, value, false);
      }
      function maybeoperatorNoComma(type, value, noComma) {
        var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
        var expr = noComma == false ? expression : expressionNoComma;
        if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
        if (type == "operator") {
          if (/\+\+|--/.test(value) || isTS && value == "!") return cont(me);
          if (isTS && value == "<" && cx.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, false))
            return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
          if (value == "?") return cont(expression, expect(":"), expr);
          return cont(expr);
        }
        if (type == "quasi") { return pass(quasi, me); }
        if (type == ";") return;
        if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
        if (type == ".") return cont(property, me);
        if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
        if (isTS && value == "as") { cx.marked = "keyword"; return cont(typeexpr, me) }
        if (type == "regexp") {
          cx.state.lastType = cx.marked = "operator";
          cx.stream.backUp(cx.stream.pos - cx.stream.start - 1);
          return cont(expr)
        }
      }
      function quasi(type, value) {
        if (type != "quasi") return pass();
        if (value.slice(value.length - 2) != "${") return cont(quasi);
        return cont(expression, continueQuasi);
      }
      function continueQuasi(type) {
        if (type == "}") {
          cx.marked = "string-2";
          cx.state.tokenize = tokenQuasi;
          return cont(quasi);
        }
      }
      function arrowBody(type) {
        findFatArrow(cx.stream, cx.state);
        return pass(type == "{" ? statement : expression);
      }
      function arrowBodyNoComma(type) {
        findFatArrow(cx.stream, cx.state);
        return pass(type == "{" ? statement : expressionNoComma);
      }
      function maybeTarget(noComma) {
        return function(type) {
          if (type == ".") return cont(noComma ? targetNoComma : target);
          else if (type == "variable" && isTS) return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma)
          else return pass(noComma ? expressionNoComma : expression);
        };
      }
      function target(_, value) {
        if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorComma); }
      }
      function targetNoComma(_, value) {
        if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorNoComma); }
      }
      function maybelabel(type) {
        if (type == ":") return cont(poplex, statement);
        return pass(maybeoperatorComma, expect(";"), poplex);
      }
      function property(type) {
        if (type == "variable") {cx.marked = "property"; return cont();}
      }
      function objprop(type, value) {
        if (type == "async") {
          cx.marked = "property";
          return cont(objprop);
        } else if (type == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          if (value == "get" || value == "set") return cont(getterSetter);
          var m; // Work around fat-arrow-detection complication for detecting typescript typed arrow params
          if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
            cx.state.fatArrowAt = cx.stream.pos + m[0].length;
          return cont(afterprop);
        } else if (type == "number" || type == "string") {
          cx.marked = jsonldMode ? "property" : (cx.style + " property");
          return cont(afterprop);
        } else if (type == "jsonld-keyword") {
          return cont(afterprop);
        } else if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(objprop)
        } else if (type == "[") {
          return cont(expression, maybetype, expect("]"), afterprop);
        } else if (type == "spread") {
          return cont(expressionNoComma, afterprop);
        } else if (value == "*") {
          cx.marked = "keyword";
          return cont(objprop);
        } else if (type == ":") {
          return pass(afterprop)
        }
      }
      function getterSetter(type) {
        if (type != "variable") return pass(afterprop);
        cx.marked = "property";
        return cont(functiondef);
      }
      function afterprop(type) {
        if (type == ":") return cont(expressionNoComma);
        if (type == "(") return pass(functiondef);
      }
      function commasep(what, end, sep) {
        function proceed(type, value) {
          if (sep ? sep.indexOf(type) > -1 : type == ",") {
            var lex = cx.state.lexical;
            if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
            return cont(function(type, value) {
              if (type == end || value == end) return pass()
              return pass(what)
            }, proceed);
          }
          if (type == end || value == end) return cont();
          if (sep && sep.indexOf(";") > -1) return pass(what)
          return cont(expect(end));
        }
        return function(type, value) {
          if (type == end || value == end) return cont();
          return pass(what, proceed);
        };
      }
      function contCommasep(what, end, info) {
        for (var i = 3; i < arguments.length; i++)
          cx.cc.push(arguments[i]);
        return cont(pushlex(end, info), commasep(what, end), poplex);
      }
      function block(type) {
        if (type == "}") return cont();
        return pass(statement, block);
      }
      function maybetype(type, value) {
        if (isTS) {
          if (type == ":") return cont(typeexpr);
          if (value == "?") return cont(maybetype);
        }
      }
      function maybetypeOrIn(type, value) {
        if (isTS && (type == ":" || value == "in")) return cont(typeexpr)
      }
      function mayberettype(type) {
        if (isTS && type == ":") {
          if (cx.stream.match(/^\s*\w+\s+is\b/, false)) return cont(expression, isKW, typeexpr)
          else return cont(typeexpr)
        }
      }
      function isKW(_, value) {
        if (value == "is") {
          cx.marked = "keyword";
          return cont()
        }
      }
      function typeexpr(type, value) {
        if (value == "keyof" || value == "typeof" || value == "infer") {
          cx.marked = "keyword";
          return cont(value == "typeof" ? expressionNoComma : typeexpr)
        }
        if (type == "variable" || value == "void") {
          cx.marked = "type";
          return cont(afterType)
        }
        if (value == "|" || value == "&") return cont(typeexpr)
        if (type == "string" || type == "number" || type == "atom") return cont(afterType);
        if (type == "[") return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType)
        if (type == "{") return cont(pushlex("}"), commasep(typeprop, "}", ",;"), poplex, afterType)
        if (type == "(") return cont(commasep(typearg, ")"), maybeReturnType, afterType)
        if (type == "<") return cont(commasep(typeexpr, ">"), typeexpr)
      }
      function maybeReturnType(type) {
        if (type == "=>") return cont(typeexpr)
      }
      function typeprop(type, value) {
        if (type == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          return cont(typeprop)
        } else if (value == "?" || type == "number" || type == "string") {
          return cont(typeprop)
        } else if (type == ":") {
          return cont(typeexpr)
        } else if (type == "[") {
          return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop)
        } else if (type == "(") {
          return pass(functiondecl, typeprop)
        }
      }
      function typearg(type, value) {
        if (type == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?") return cont(typearg)
        if (type == ":") return cont(typeexpr)
        if (type == "spread") return cont(typearg)
        return pass(typeexpr)
      }
      function afterType(type, value) {
        if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
        if (value == "|" || type == "." || value == "&") return cont(typeexpr)
        if (type == "[") return cont(typeexpr, expect("]"), afterType)
        if (value == "extends" || value == "implements") { cx.marked = "keyword"; return cont(typeexpr) }
        if (value == "?") return cont(typeexpr, expect(":"), typeexpr)
      }
      function maybeTypeArgs(_, value) {
        if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType)
      }
      function typeparam() {
        return pass(typeexpr, maybeTypeDefault)
      }
      function maybeTypeDefault(_, value) {
        if (value == "=") return cont(typeexpr)
      }
      function vardef(_, value) {
        if (value == "enum") {cx.marked = "keyword"; return cont(enumdef)}
        return pass(pattern, maybetype, maybeAssign, vardefCont);
      }
      function pattern(type, value) {
        if (isTS && isModifier(value)) { cx.marked = "keyword"; return cont(pattern) }
        if (type == "variable") { register(value); return cont(); }
        if (type == "spread") return cont(pattern);
        if (type == "[") return contCommasep(eltpattern, "]");
        if (type == "{") return contCommasep(proppattern, "}");
      }
      function proppattern(type, value) {
        if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
          register(value);
          return cont(maybeAssign);
        }
        if (type == "variable") cx.marked = "property";
        if (type == "spread") return cont(pattern);
        if (type == "}") return pass();
        if (type == "[") return cont(expression, expect(']'), expect(':'), proppattern);
        return cont(expect(":"), pattern, maybeAssign);
      }
      function eltpattern() {
        return pass(pattern, maybeAssign)
      }
      function maybeAssign(_type, value) {
        if (value == "=") return cont(expressionNoComma);
      }
      function vardefCont(type) {
        if (type == ",") return cont(vardef);
      }
      function maybeelse(type, value) {
        if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
      }
      function forspec(type, value) {
        if (value == "await") return cont(forspec);
        if (type == "(") return cont(pushlex(")"), forspec1, poplex);
      }
      function forspec1(type) {
        if (type == "var") return cont(vardef, forspec2);
        if (type == "variable") return cont(forspec2);
        return pass(forspec2)
      }
      function forspec2(type, value) {
        if (type == ")") return cont()
        if (type == ";") return cont(forspec2)
        if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression, forspec2) }
        return pass(expression, forspec2)
      }
      function functiondef(type, value) {
        if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
        if (type == "variable") {register(value); return cont(functiondef);}
        if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
        if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef)
      }
      function functiondecl(type, value) {
        if (value == "*") {cx.marked = "keyword"; return cont(functiondecl);}
        if (type == "variable") {register(value); return cont(functiondecl);}
        if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
        if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl)
      }
      function typename(type, value) {
        if (type == "keyword" || type == "variable") {
          cx.marked = "type";
          return cont(typename)
        } else if (value == "<") {
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex)
        }
      }
      function funarg(type, value) {
        if (value == "@") cont(expression, funarg);
        if (type == "spread") return cont(funarg);
        if (isTS && isModifier(value)) { cx.marked = "keyword"; return cont(funarg); }
        if (isTS && type == "this") return cont(maybetype, maybeAssign)
        return pass(pattern, maybetype, maybeAssign);
      }
      function classExpression(type, value) {
        // Class expressions may have an optional name.
        if (type == "variable") return className(type, value);
        return classNameAfter(type, value);
      }
      function className(type, value) {
        if (type == "variable") {register(value); return cont(classNameAfter);}
      }
      function classNameAfter(type, value) {
        if (value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter)
        if (value == "extends" || value == "implements" || (isTS && type == ",")) {
          if (value == "implements") cx.marked = "keyword";
          return cont(isTS ? typeexpr : expression, classNameAfter);
        }
        if (type == "{") return cont(pushlex("}"), classBody, poplex);
      }
      function classBody(type, value) {
        if (type == "async" ||
            (type == "variable" &&
             (value == "static" || value == "get" || value == "set" || (isTS && isModifier(value))) &&
             cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false))) {
          cx.marked = "keyword";
          return cont(classBody);
        }
        if (type == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          return cont(classfield, classBody);
        }
        if (type == "number" || type == "string") return cont(classfield, classBody);
        if (type == "[")
          return cont(expression, maybetype, expect("]"), classfield, classBody)
        if (value == "*") {
          cx.marked = "keyword";
          return cont(classBody);
        }
        if (isTS && type == "(") return pass(functiondecl, classBody)
        if (type == ";" || type == ",") return cont(classBody);
        if (type == "}") return cont();
        if (value == "@") return cont(expression, classBody)
      }
      function classfield(type, value) {
        if (value == "?") return cont(classfield)
        if (type == ":") return cont(typeexpr, maybeAssign)
        if (value == "=") return cont(expressionNoComma)
        var context = cx.state.lexical.prev, isInterface = context && context.info == "interface";
        return pass(isInterface ? functiondecl : functiondef)
      }
      function afterExport(type, value) {
        if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
        if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
        if (type == "{") return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
        return pass(statement);
      }
      function exportField(type, value) {
        if (value == "as") { cx.marked = "keyword"; return cont(expect("variable")); }
        if (type == "variable") return pass(expressionNoComma, exportField);
      }
      function afterImport(type) {
        if (type == "string") return cont();
        if (type == "(") return pass(expression);
        return pass(importSpec, maybeMoreImports, maybeFrom);
      }
      function importSpec(type, value) {
        if (type == "{") return contCommasep(importSpec, "}");
        if (type == "variable") register(value);
        if (value == "*") cx.marked = "keyword";
        return cont(maybeAs);
      }
      function maybeMoreImports(type) {
        if (type == ",") return cont(importSpec, maybeMoreImports)
      }
      function maybeAs(_type, value) {
        if (value == "as") { cx.marked = "keyword"; return cont(importSpec); }
      }
      function maybeFrom(_type, value) {
        if (value == "from") { cx.marked = "keyword"; return cont(expression); }
      }
      function arrayLiteral(type) {
        if (type == "]") return cont();
        return pass(commasep(expressionNoComma, "]"));
      }
      function enumdef() {
        return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex)
      }
      function enummember() {
        return pass(pattern, maybeAssign);
      }
  
      function isContinuedStatement(state, textAfter) {
        return state.lastType == "operator" || state.lastType == "," ||
          isOperatorChar.test(textAfter.charAt(0)) ||
          /[,.]/.test(textAfter.charAt(0));
      }
  
      function expressionAllowed(stream, state, backUp) {
        return state.tokenize == tokenBase &&
          /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
          (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
      }
  
      // Interface
  
      return {
        startState: function(basecolumn) {
          var state = {
            tokenize: tokenBase,
            lastType: "sof",
            cc: [],
            lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
            localVars: parserConfig.localVars,
            context: parserConfig.localVars && new Context(null, null, false),
            indented: basecolumn || 0
          };
          if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
            state.globalVars = parserConfig.globalVars;
          return state;
        },
  
        token: function(stream, state) {
          if (stream.sol()) {
            if (!state.lexical.hasOwnProperty("align"))
              state.lexical.align = false;
            state.indented = stream.indentation();
            findFatArrow(stream, state);
          }
          if (state.tokenize != tokenComment && stream.eatSpace()) return null;
          var style = state.tokenize(stream, state);
          if (type == "comment") return style;
          state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
          return parseJS(state, style, type, content, stream);
        },
  
        indent: function(state, textAfter) {
          if (state.tokenize == tokenComment || state.tokenize == tokenQuasi) return CodeMirror.Pass;
          if (state.tokenize != tokenBase) return 0;
          var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top;
          // Kludge to prevent 'maybelse' from blocking lexical scope pops
          if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
            var c = state.cc[i];
            if (c == poplex) lexical = lexical.prev;
            else if (c != maybeelse) break;
          }
          while ((lexical.type == "stat" || lexical.type == "form") &&
                 (firstChar == "}" || ((top = state.cc[state.cc.length - 1]) &&
                                       (top == maybeoperatorComma || top == maybeoperatorNoComma) &&
                                       !/^[,\.=+\-*:?[\(]/.test(textAfter))))
            lexical = lexical.prev;
          if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
            lexical = lexical.prev;
          var type = lexical.type, closing = firstChar == type;
  
          if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
          else if (type == "form" && firstChar == "{") return lexical.indented;
          else if (type == "form") return lexical.indented + indentUnit;
          else if (type == "stat")
            return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
          else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
            return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
          else if (lexical.align) return lexical.column + (closing ? 0 : 1);
          else return lexical.indented + (closing ? 0 : indentUnit);
        },
  
        electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
        blockCommentStart: jsonMode ? null : "/*",
        blockCommentEnd: jsonMode ? null : "*/",
        blockCommentContinue: jsonMode ? null : " * ",
        lineComment: jsonMode ? null : "//",
        fold: "brace",
        closeBrackets: "()[]{}''\"\"``",
  
        helperType: jsonMode ? "json" : "javascript",
        jsonldMode: jsonldMode,
        jsonMode: jsonMode,
  
        expressionAllowed: expressionAllowed,
  
        skipExpression: function(state) {
          var top = state.cc[state.cc.length - 1];
          if (top == expression || top == expressionNoComma) state.cc.pop();
        }
      };
    });
  
    CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);
  
    CodeMirror.defineMIME("text/javascript", "javascript");
    CodeMirror.defineMIME("text/ecmascript", "javascript");
    CodeMirror.defineMIME("application/javascript", "javascript");
    CodeMirror.defineMIME("application/x-javascript", "javascript");
    CodeMirror.defineMIME("application/ecmascript", "javascript");
    CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
    CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
    CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
    CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
    CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });
  
    });
    });
  
    var require$$0 = /*@__PURE__*/getAugmentedNamespace(util$1);
  
    /* eslint-env browser */
  
  
  
  
    var inspect$1    = require$$0.inspect;
  
  
  
  
  
  
    var source, result, permalink, default_text;
  
    var SexyYamlType = new jsYaml.Type('!sexy', {
      kind: 'sequence', // See node kinds in YAML spec: http://www.yaml.org/spec/1.2/spec.html#kind//
      construct: function (data) {
        return data.map(function (string) { return 'sexy ' + string; });
      }
    });
  
    var SEXY_SCHEMA = jsYaml.DEFAULT_SCHEMA.extend([ SexyYamlType ]);
  
    function parse() {
      var str, obj;
  
      str = source.getValue();
      permalink.href = '#yaml=' + base64.encode(str);
  
      try {
        obj = jsYaml.load(str, { schema: SEXY_SCHEMA });
  
        result.setOption('mode', 'javascript');
        result.setValue(inspect$1(obj, false, 10));
      } catch (err) {
        result.setOption('mode', 'text/plain');
        result.setValue(err.message || String(err));
      }
    }
  
    function updateSource() {
      var yaml;
  
      if (location.hash && location.hash.toString().slice(0, 6) === '#yaml=') {
        yaml = base64.decode(location.hash.slice(6));
      }
  
      source.setValue(yaml || default_text);
      parse();
    }
  
 
  
    var demo = {
  
    };
  
    return demo;
  
  }());