import gm from 'gm';
import path from 'path';
import fs from 'fs';

const ignoredFiles = fs.readFileSync(`${process.cwd()}/.retinaignore`).toString().split('\n').filter(d => d);

const flatten = list => list.reduce(
	(a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

const walkSync = (d) => {
	if (fs.statSync(d).isDirectory()) {
		return fs.readdirSync(d).map(f => walkSync(path.join(d, f)))
	} else {
		if (!ignoredFiles.some(ignoreFile => (new RegExp(ignoreFile, 'i')).test(d))) {
			return d
		}
	}
};
let files = flatten(walkSync(`${process.cwd()}/src/image`)).filter(d => d);

const filesToOptimize = files.reduce((acc, file) => {
	if (file.includes('@2x.')) {
		return acc.filter(f => f !== file.replace('@2x.', '.'))
	}

	return [...acc, file]
}, []);

for (const file of filesToOptimize) {
	gm(file)
		.size({
			bufferStream: true
		}, function (err, size) {
			if (err) {
				throw err
			}

			const [ filePathAndName, fileExt ] = file.split('.');

			this.write(`${filePathAndName}@2x.${fileExt}`, function (err) {
				if (!err) console.log(`Write ${filePathAndName}@2x.${fileExt}`);
			});

			this.resize(size.width / 2, size.height / 2);

			this.write(file, function (err) {
				if (!err) console.log(`Write ${filePathAndName}.${fileExt}`);
			});
		});
}
