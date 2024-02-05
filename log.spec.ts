import logger, { InfluxWriteStream } from './log';
import { it, describe } from 'bun:test';

describe('log', () => {
	it('logging', () => {
		const log = logger().prefix('Test').trace();

		log.info('Hello, world!');
		log.error('This is an error!');
	});

	it('json', () => {
		const logJson = logger().prefix('Json').json().trace();
		logJson.info('Hello, world!');
	});

	it('influx', () => {
		const log = logger()
			.prefix('Influx')
			.time(false)
			.pipeTo(
				new InfluxWriteStream({
					org: 'ekko',
					bucket: 'test',
					db: 'test',
					url: 'https://logging.luckydye.de',
					token:
						'agqaDudQ-m9BRzgaWyosOk6QYKXRNhJZPP677HHygtGdbU5Rh8yUMr7yDpftEIQLOd5f7jL0Jjevb5NyCoBlCw==',
				})
			);

		log.info('Hello, world!');
	});
});
