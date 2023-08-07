import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TestPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (metadata.data == 'username') {
			if (value != 'Admin') console.log('this is not admin');
			else console.log('this is admin');
		}
	}
}
