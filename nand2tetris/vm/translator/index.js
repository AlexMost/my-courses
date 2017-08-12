module.exports = {  };

if (process.env.NODE_ENV === 'test') {
	module.exports._test = {
		translatePush
	}
}