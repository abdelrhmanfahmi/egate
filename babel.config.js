module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset','@babel/preset-env'
  ],
  plugins: [
	"@babel/plugin-proposal-class-properties",
	"@babel/plugin-proposal-private-methods",'@babel/plugin-transform-runtime',],
	comments: false,
	overrides: [
		{
			// only process jsx with react style for styleguide components
			include: ['**/styleguide/components/*.js'],
			plugins: ['@babel/plugin-transform-react-jsx']
		},
		{
			// For vue components process jsx with the vue style
			include: ['**/src/components/**/*.jsx'],
			plugins: ['transform-vue-jsx']
		}
	]
}
