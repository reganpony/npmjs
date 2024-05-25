import esbuild from 'esbuild'

class Bundle {

	points = [
		{
			in: 'src/main.ts',
			out: 'index'
		},
	];

	/**
	 * 初始化
	 */
	async initial() {
		const that = this;
		return await esbuild.context({
			entryPoints: this.points,
			logLevel: 'info',
			bundle: true,
			sourcemap: false,
			minify: false,
			sourcesContent: false,
			logOverride: {
				'commonjs-variable-in-esm': 'silent'
			},
			platform: 'node',
			format: 'cjs',
			// format: 'esm',
			tsconfig: 'tsconfig.json',
			outdir: './dist',
			metafile: true,
			packages: 'external',
			target: 'node16',
			loader: {
				'.ts': 'ts',
			},
			plugins: [
				// esbuildPluginTsc({
				// 	force: true,
				// 	tsx: false,
				// }),
			]
		});
	}


	async run() {
		const context = await this.initial();
		await context.watch();
	}
}

await (new Bundle()).run();