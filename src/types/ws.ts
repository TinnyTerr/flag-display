type BasePayload<op extends PayloadType, d = unknown> = {
	t: op;
	d: d;
};

interface Payload {
	t: PayloadType;
	d: unknown;
}

enum PayloadType {
	auth = 0,
	authSuccess = 1,
	deviceUpdate = 2,
	request = 3,
	status = 4,
	error = 5,
	heartbeat = 6,
	heartbeatAck = 7,
	commandPrepare = 8,
	commandExecute = 9,
	commandPrepareAck = 10,
	commandExecuteAck = 11,
}

enum DeviceType {
	display = "display",
	controller = "controller",
	manager = "manager",
}

export type DeviceID = string;
export type SessionID = string;
export type Timestamp = number;

interface DeviceInfo {
  id: DeviceID;
  type: DeviceType;
  token: string;
  agent: string;
  metadata?: Record<string, unknown>;
}

type DeviceInfoPayload = BasePayload<PayloadType.auth, DeviceInfo>

interface DeviceSession {
  sessionId: SessionID;
  device: DeviceInfo;
  connectedAt: Timestamp;
  lastSeenAt: Timestamp;
  ip?: string;
}

type DeviceSessionPayload = BasePayload<PayloadType.authSuccess, DeviceSession>


interface Heartbeat {
  sessionId: SessionID;
  timestamp: Timestamp;
}

type HeartbeatPayload = BasePayload<PayloadType.heartbeat, Heartbeat>

interface DeviceCommand<p extends boolean, T = unknown> {
  commandId: string;
  type: string;
  payload?: T;
  issuedAt: Timestamp;
  prepareOnly: p;
}

type DeviceCommandPayload<p extends boolean, T = unknown> = BasePayload<p extends true ? PayloadType.commandPrepare : PayloadType.commandExecute, DeviceCommand<p,T>>

interface CommandResult<p extends boolean, T = unknown> {
  commandId: string;
  success: boolean;
  result?: T;
  error?: string;
  completedAt: Timestamp;
  prepareOnly: p;
}

type CommandResultPayload<p extends boolean, T = unknown> = BasePayload<p extends true ? PayloadType.commandPrepareAck : PayloadType.commandExecuteAck, CommandResult<p,T>>

export type {
	Payload,
	DeviceInfoPayload,
	DeviceSessionPayload,
	HeartbeatPayload,
	DeviceCommandPayload,
	CommandResultPayload
}