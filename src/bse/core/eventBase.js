import { trim, removeItem, defObjectProtoValue } from "@bse/utils/index.js";
function getListener(obj, type, force) {
  let allListeners;
  type = type.toLowerCase();
  if (!obj.__allListeners) defObjectProtoValue(obj, "__allListeners", {});
  return (
    (allListeners =
      obj.__allListeners || (force && (obj.__allListeners = {}))) &&
    (allListeners[type] || (force && (allListeners[type] = [])))
  );
}

function addListener(types, listener) {
  types = trim(types).split(/\s+/);
  for (var i = 0, ti; (ti = types[i++]); ) {
    getListener(this, ti, true).push(listener);
  }
}

function removeListener(types, listener) {
  types = trim(types).split(/\s+/);
  for (var i = 0, ti; (ti = types[i++]); ) {
    removeItem(getListener(this, ti) || [], listener);
  }
}

function fireEvent() {
  var types = arguments[0];
  types = trim(types).split(" ");
  for (var i = 0, ti; (ti = types[i++]); ) {
    var listeners = getListener(this, ti, true),
      r,
      t,
      k;
    if (listeners) {
      k = listeners.length;
      while (k--) {
        if (!listeners[k]) continue;
        t = listeners[k].apply(this, [...arguments].slice(1));
        if (t === true) {
          return t;
        }
        if (t !== undefined) {
          r = t;
        }
      }
    }
    if ((t = this["on" + ti.toLowerCase()])) {
      r = t.apply(this, [...arguments].slice(1));
    }
  }
  return r;
}

function registerCommand(
  commandName,
  obj = { execCommand, queryCommandState, queryCommandValue }
) {
  if (this.commands && Object.hasOwn(this.commands, commandName)) {
    console.warn(`【warning】：${commandName}命令名存在相同,无法注册`);
  }
  this.commands
    ? (this.commands[commandName] = obj)
    : (this.commands = { [commandName]: obj });
}

async function execCommand(cmdName) {
  const cmd = this.commands[cmdName];
  if (!cmd || !cmd?.execCommand)
    console.warn(`【warning】：${cmdName}命令名不存在`);
  return await cmd?.execCommand?.apply(this, arguments);
}

async function queryCommandState(cmdName) {
  const cmd = this.commands[cmdName];
  if (!cmd || !cmd?.queryCommandState)
    console.warn(`【warning】：${cmdName}命令名不存在`);
  return await cmd?.queryCommandState?.apply(this, arguments);
}

async function queryCommandValue(cmdName) {
  const cmd = this.commands[cmdName];
  if (!cmd || !cmd?.queryCommandValue)
    console.warn(`【warning】：${cmdName}命令名不存在`);
  return await cmd?.queryCommandValue?.apply(this, arguments);
}

export default {
  addListener,
  removeListener,
  fireEvent,
  registerCommand,
  execCommand,
  queryCommandState,
  queryCommandValue
};
