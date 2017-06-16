/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var src_main_java_com_github_kornilova_l_protos_event_pb = require('../../../../../../../src/main/java/com/github/kornilova_l/protos/event_pb.js');
goog.exportSymbol('proto.com.github.kornilova_l.protos.Tree', null, global);
goog.exportSymbol('proto.com.github.kornilova_l.protos.Tree.Call', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.github.kornilova_l.protos.Tree = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.com.github.kornilova_l.protos.Tree.repeatedFields_, null);
};
goog.inherits(proto.com.github.kornilova_l.protos.Tree, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.com.github.kornilova_l.protos.Tree.displayName = 'proto.com.github.kornilova_l.protos.Tree';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.com.github.kornilova_l.protos.Tree.repeatedFields_ = [4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.com.github.kornilova_l.protos.Tree.prototype.toObject = function(opt_includeInstance) {
  return proto.com.github.kornilova_l.protos.Tree.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.com.github.kornilova_l.protos.Tree} msg The msg instance to transform.
 * @return {!Object}
 */
proto.com.github.kornilova_l.protos.Tree.toObject = function(includeInstance, msg) {
  var f, obj = {
    duration: jspb.Message.getFieldWithDefault(msg, 1, 0),
    starttime: jspb.Message.getFieldWithDefault(msg, 2, 0),
    threadid: jspb.Message.getFieldWithDefault(msg, 3, 0),
    callsList: jspb.Message.toObjectList(msg.getCallsList(),
    proto.com.github.kornilova_l.protos.Tree.Call.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.github.kornilova_l.protos.Tree}
 */
proto.com.github.kornilova_l.protos.Tree.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.com.github.kornilova_l.protos.Tree;
  return proto.com.github.kornilova_l.protos.Tree.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.github.kornilova_l.protos.Tree} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.github.kornilova_l.protos.Tree}
 */
proto.com.github.kornilova_l.protos.Tree.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDuration(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStarttime(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setThreadid(value);
      break;
    case 4:
      var value = new proto.com.github.kornilova_l.protos.Tree.Call;
      reader.readMessage(value,proto.com.github.kornilova_l.protos.Tree.Call.deserializeBinaryFromReader);
      msg.addCalls(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.github.kornilova_l.protos.Tree.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.com.github.kornilova_l.protos.Tree.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.github.kornilova_l.protos.Tree} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.com.github.kornilova_l.protos.Tree.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDuration();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getStarttime();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getThreadid();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getCallsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.com.github.kornilova_l.protos.Tree.Call.serializeBinaryToWriter
    );
  }
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.github.kornilova_l.protos.Tree.Call = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.com.github.kornilova_l.protos.Tree.Call.repeatedFields_, proto.com.github.kornilova_l.protos.Tree.Call.oneofGroups_);
};
goog.inherits(proto.com.github.kornilova_l.protos.Tree.Call, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.com.github.kornilova_l.protos.Tree.Call.displayName = 'proto.com.github.kornilova_l.protos.Tree.Call';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.com.github.kornilova_l.protos.Tree.Call.repeatedFields_ = [6];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.com.github.kornilova_l.protos.Tree.Call.oneofGroups_ = [[3,4]];

/**
 * @enum {number}
 */
proto.com.github.kornilova_l.protos.Tree.Call.ExitinfoCase = {
  EXITINFO_NOT_SET: 0,
  EXIT: 3,
  EXCEPTION: 4
};

/**
 * @return {proto.com.github.kornilova_l.protos.Tree.Call.ExitinfoCase}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.getExitinfoCase = function() {
  return /** @type {proto.com.github.kornilova_l.protos.Tree.Call.ExitinfoCase} */(jspb.Message.computeOneofCase(this, proto.com.github.kornilova_l.protos.Tree.Call.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.toObject = function(opt_includeInstance) {
  return proto.com.github.kornilova_l.protos.Tree.Call.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.com.github.kornilova_l.protos.Tree.Call} msg The msg instance to transform.
 * @return {!Object}
 */
proto.com.github.kornilova_l.protos.Tree.Call.toObject = function(includeInstance, msg) {
  var f, obj = {
    duration: jspb.Message.getFieldWithDefault(msg, 1, 0),
    enter: (f = msg.getEnter()) && src_main_java_com_github_kornilova_l_protos_event_pb.Event.Enter.toObject(includeInstance, f),
    exit: (f = msg.getExit()) && src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exit.toObject(includeInstance, f),
    exception: (f = msg.getException()) && src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exception.toObject(includeInstance, f),
    starttime: jspb.Message.getFieldWithDefault(msg, 5, 0),
    callsList: jspb.Message.toObjectList(msg.getCallsList(),
    proto.com.github.kornilova_l.protos.Tree.Call.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.github.kornilova_l.protos.Tree.Call}
 */
proto.com.github.kornilova_l.protos.Tree.Call.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.com.github.kornilova_l.protos.Tree.Call;
  return proto.com.github.kornilova_l.protos.Tree.Call.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.github.kornilova_l.protos.Tree.Call} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.github.kornilova_l.protos.Tree.Call}
 */
proto.com.github.kornilova_l.protos.Tree.Call.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setDuration(value);
      break;
    case 2:
      var value = new src_main_java_com_github_kornilova_l_protos_event_pb.Event.Enter;
      reader.readMessage(value,src_main_java_com_github_kornilova_l_protos_event_pb.Event.Enter.deserializeBinaryFromReader);
      msg.setEnter(value);
      break;
    case 3:
      var value = new src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exit;
      reader.readMessage(value,src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exit.deserializeBinaryFromReader);
      msg.setExit(value);
      break;
    case 4:
      var value = new src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exception;
      reader.readMessage(value,src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exception.deserializeBinaryFromReader);
      msg.setException(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setStarttime(value);
      break;
    case 6:
      var value = new proto.com.github.kornilova_l.protos.Tree.Call;
      reader.readMessage(value,proto.com.github.kornilova_l.protos.Tree.Call.deserializeBinaryFromReader);
      msg.addCalls(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.com.github.kornilova_l.protos.Tree.Call.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.github.kornilova_l.protos.Tree.Call} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.com.github.kornilova_l.protos.Tree.Call.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getDuration();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getEnter();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      src_main_java_com_github_kornilova_l_protos_event_pb.Event.Enter.serializeBinaryToWriter
    );
  }
  f = message.getExit();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exit.serializeBinaryToWriter
    );
  }
  f = message.getException();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exception.serializeBinaryToWriter
    );
  }
  f = message.getStarttime();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getCallsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.com.github.kornilova_l.protos.Tree.Call.serializeBinaryToWriter
    );
  }
};


/**
 * optional int64 duration = 1;
 * @return {number}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.getDuration = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.setDuration = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional Event.Enter enter = 2;
 * @return {?proto.com.github.kornilova_l.protos.Event.Enter}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.getEnter = function() {
  return /** @type{?proto.com.github.kornilova_l.protos.Event.Enter} */ (
    jspb.Message.getWrapperField(this, src_main_java_com_github_kornilova_l_protos_event_pb.Event.Enter, 2));
};


/** @param {?proto.com.github.kornilova_l.protos.Event.Enter|undefined} value */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.setEnter = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.com.github.kornilova_l.protos.Tree.Call.prototype.clearEnter = function() {
  this.setEnter(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.hasEnter = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Event.Exit exit = 3;
 * @return {?proto.com.github.kornilova_l.protos.Event.Exit}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.getExit = function() {
  return /** @type{?proto.com.github.kornilova_l.protos.Event.Exit} */ (
    jspb.Message.getWrapperField(this, src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exit, 3));
};


/** @param {?proto.com.github.kornilova_l.protos.Event.Exit|undefined} value */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.setExit = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.com.github.kornilova_l.protos.Tree.Call.oneofGroups_[0], value);
};


proto.com.github.kornilova_l.protos.Tree.Call.prototype.clearExit = function() {
  this.setExit(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.hasExit = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Event.Exception exception = 4;
 * @return {?proto.com.github.kornilova_l.protos.Event.Exception}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.getException = function() {
  return /** @type{?proto.com.github.kornilova_l.protos.Event.Exception} */ (
    jspb.Message.getWrapperField(this, src_main_java_com_github_kornilova_l_protos_event_pb.Event.Exception, 4));
};


/** @param {?proto.com.github.kornilova_l.protos.Event.Exception|undefined} value */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.setException = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.com.github.kornilova_l.protos.Tree.Call.oneofGroups_[0], value);
};


proto.com.github.kornilova_l.protos.Tree.Call.prototype.clearException = function() {
  this.setException(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.hasException = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int64 startTime = 5;
 * @return {number}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.getStarttime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/** @param {number} value */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.setStarttime = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * repeated Call calls = 6;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.com.github.kornilova_l.protos.Tree.Call>}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.getCallsList = function() {
  return /** @type{!Array.<!proto.com.github.kornilova_l.protos.Tree.Call>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.com.github.kornilova_l.protos.Tree.Call, 6));
};


/** @param {!Array.<!proto.com.github.kornilova_l.protos.Tree.Call>} value */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.setCallsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.com.github.kornilova_l.protos.Tree.Call=} opt_value
 * @param {number=} opt_index
 * @return {!proto.com.github.kornilova_l.protos.Tree.Call}
 */
proto.com.github.kornilova_l.protos.Tree.Call.prototype.addCalls = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.com.github.kornilova_l.protos.Tree.Call, opt_index);
};


proto.com.github.kornilova_l.protos.Tree.Call.prototype.clearCallsList = function() {
  this.setCallsList([]);
};


/**
 * optional int64 duration = 1;
 * @return {number}
 */
proto.com.github.kornilova_l.protos.Tree.prototype.getDuration = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.com.github.kornilova_l.protos.Tree.prototype.setDuration = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional int64 startTime = 2;
 * @return {number}
 */
proto.com.github.kornilova_l.protos.Tree.prototype.getStarttime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.com.github.kornilova_l.protos.Tree.prototype.setStarttime = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional int64 threadId = 3;
 * @return {number}
 */
proto.com.github.kornilova_l.protos.Tree.prototype.getThreadid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.com.github.kornilova_l.protos.Tree.prototype.setThreadid = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * repeated Call calls = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.com.github.kornilova_l.protos.Tree.Call>}
 */
proto.com.github.kornilova_l.protos.Tree.prototype.getCallsList = function() {
  return /** @type{!Array.<!proto.com.github.kornilova_l.protos.Tree.Call>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.com.github.kornilova_l.protos.Tree.Call, 4));
};


/** @param {!Array.<!proto.com.github.kornilova_l.protos.Tree.Call>} value */
proto.com.github.kornilova_l.protos.Tree.prototype.setCallsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.com.github.kornilova_l.protos.Tree.Call=} opt_value
 * @param {number=} opt_index
 * @return {!proto.com.github.kornilova_l.protos.Tree.Call}
 */
proto.com.github.kornilova_l.protos.Tree.prototype.addCalls = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.com.github.kornilova_l.protos.Tree.Call, opt_index);
};


proto.com.github.kornilova_l.protos.Tree.prototype.clearCallsList = function() {
  this.setCallsList([]);
};


goog.object.extend(exports, proto.com.github.kornilova_l.protos);
