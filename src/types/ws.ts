type BasePayload<d = unknown> = {
	t: PayloadType;
	d: d;
};

interface Payload {
	t: PayloadType;
	d: unknown;
}

enum PayloadType {
	init = 0,
	deviceUpdate = 1,
	request = 2,
	status = 3,
	error = 4,
	heartbeat = 5,
	heartbeatAck = 6,
	commandPrepare = 7,
	commandExecute = 8,
	commandPrepareAck = 9,
	commandExecuteAck = 10,
}
